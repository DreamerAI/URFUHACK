import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const Translate = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [addGptQuery, setAddGptQuery] = useState(false)

    const handleCheckboxChange = () => {
        setAddGptQuery(prevState => !prevState);
    };

    useEffect(() => {
        if (isCameraOn) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;

                        const mediaRecorder = new MediaRecorder(stream);
                        mediaRecorder.ondataavailable = event => {
                            if (event.data.size > 0) {
                                recordedChunksRef.current.push(event.data);
                            }
                        };
                        mediaRecorderRef.current = mediaRecorder;
                    }
                })
                .catch(error => {
                    console.error("Error accessing camera:", error);
                });
        } else {
            const videoStream = videoRef.current?.srcObject as MediaStream | null;
            if (videoStream) {
                videoStream.getTracks().forEach(track => {
                    track.stop();
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = null;
                }
            }
        }
    }, [isCameraOn]);

    const handleToggleCamera = () => {
        setIsCameraOn(prevIsCameraOn => !prevIsCameraOn);
    };

    const handleStartRecording = () => {
        recordedChunksRef.current = [];
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.start();
            setIsRecording(true);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);

            const recordedBlob = new Blob(recordedChunksRef.current, { type: "video/mp4" });
            sendVideoToAPI(recordedBlob);
        }
    };

    const sendVideoToAPI = async (videoBlob: Blob) => {
        try {
            const formData = new FormData();
            formData.append("video", videoBlob);

            const response = await axios.post("http://larek.itatmisis.ru:9000/sl2text", formData, {
                params: {
                    gpt: addGptQuery ? true : false
                }
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex flex-col gap-3">
            {/* Add a video element to display the camera feed */}
            <video ref={videoRef} autoPlay style={{ width: "100%" }} />

            {/* Buttons to toggle the camera and start/stop recording */}
            <button onClick={handleToggleCamera} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
            </button>
            <input
                type="checkbox"
                checked={addGptQuery}
                onChange={handleCheckboxChange}
            />
            {isCameraOn && !isRecording && (
                <button onClick={handleStartRecording} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Start Recording
                </button>
            )}
            {isRecording && (
                <button onClick={handleStopRecording} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Stop Recording
                </button>
            )}
        </div>
    );
};
