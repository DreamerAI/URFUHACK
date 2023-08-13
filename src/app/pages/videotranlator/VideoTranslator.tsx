import React, { useState } from "react";
import Webcam from "react-webcam";

export const VideoTranslator = () => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [gpt, setGpt] = useState(false);
    const [responseData, setResponseData] = useState(null);


    const handleStartCaptureClick = React.useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleUpload = async () => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm" // Change to "video/webm" if you want to send in WebM format
            });

            const formData = new FormData();
            formData.append("video", blob, "recorded-video.webm"); // Change filename and field name as needed

            try {
                const response = await fetch(
                    "http://larek.itatmisis.ru:9000/sl2text?gpt=" + gpt,
                    {
                        method: "POST",
                        body: formData
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setResponseData(data);
                } else {
                    console.error("Failed to upload video");
                }
            } catch (error) {
                console.error("Error uploading video:", error);
            }
        }
    };



    const handleStopCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    return (
        <>
            <div className="flex mx-auto">
                <Webcam audio={false} ref={webcamRef} height={360} width={360} />
            </div>
            <div className="flex justify-center">
                {capturing ? (
                    <button onClick={handleStopCaptureClick} className="mt-2 p-2 rounded-full bg-main-gray flex justify-center items-center gap-3">
                        <div className="h-9 w-9 bg-main-black-inactive">
                        </div><span>Остановить запись</span>
                    </button>
                ) : (
                    <button onClick={handleStartCaptureClick} className="mt-2 p-2 rounded-full bg-main-gray flex justify-center items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-main-red"> </div><span>Начать запись</span>
                    </button>
                )}

            </div>
            <div className="flex justify-center gap-3 mt-2">
                <input
                    type="checkbox"
                    className="form-checkbox rounded-lg text-accent-green"
                    checked={gpt}
                    onChange={() => setGpt(!gpt)}
                />
                <label className="text-main-black-inactive">Обработка GPT</label>
            </div>

            {recordedChunks.length > 0 && (
                <>
                    <div className="flex justify-center gap-2 mt-2">
                        <button onClick={handleUpload} className="py-3 px-4 border border-accent-green rounded-lg max-w-fit text-main-black-inactive">Распознать</button>
                        <button onClick={handleDownload} className="py-3 px-4 border border-accent-green rounded-lg max-w-fit text-main-black-inactive">Скачать</button>
                    </div>

                    <div className="bg-main-white rounded-lg mt-5 p-5 shadow-main-black-inactive">
                        {gpt ? <span>{responseData?.data}</span> : responseData && responseData.data && [responseData.data].map((item, index) => {
                            return <span key={index}>{item}</span>;
                        })}

                    </div>


                </>
            )}
        </>
    );
};
