import axios from 'axios';
import React, { useRef } from 'react';

export const Translate = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunksRef.current.push(event.data);
            }
        };
        mediaRecorder.onstop = async () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            const formData = new FormData();
            formData.append('video', blob, 'recorded.webm');
            try {
                const response = await axios.post('http://larek.itatmisis.ru:9000/sl2text', formData);
                console.log('Video uploaded successfully!', response.data);
            } catch (error) {
                console.error('Error uploading video:', error);
            }
            chunksRef.current = [];
        };
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl mb-4">Webcam Recorder</h1>
            <div className="mb-4">
                <video ref={videoRef} autoPlay playsInline className="w-full max-w-md" />
            </div>
            <div className="flex space-x-4">
                <button onClick={startRecording} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Start Recording
                </button>
                <button onClick={stopRecording} className="bg-red-500 text-white px-4 py-2 rounded">
                    Stop Recording
                </button>
            </div>
        </div>
    );
};
