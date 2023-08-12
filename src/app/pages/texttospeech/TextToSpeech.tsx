import React, { useState } from 'react';
import axios from 'axios';
import * as qs from 'qs';

export const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    function get_token() {
        const data = qs.stringify({
            scope: "SALUTE_SPEECH_PERS",
        });

        const api_key = "MGM1Y2EyMWEtYmY4ZS00ODFmLTg4ZGYtMTM5ZGFkZGRkNmMzOjQ5ZDhmN2NiLTUwNDktNDkwOS05MTIwLWYyODAyNTI5NjRkNA=="

        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
            headers: {
                RqUID: "6f0b1291-c7f3-43c6-bb2e-9f3efb2dc98e",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${api_key}`,
            },
            data: data,
        };

        return axios
            .request(config)
            .then((response) => {
                const data = JSON.stringify(response.data);
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    get_token()

    const handleTextToSpeech = async () => {
        try {
            const response = await axios.post('YOUR_TTS_API_ENDPOINT', { text }, { responseType: 'blob' });
            const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
        } catch (error) {
            console.error('Error converting text to speech:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-semibold mb-4">Text to Speech API Integration</h1>
            <textarea
                className="p-2 border rounded w-64 h-32 mb-4"
                placeholder="Enter text..."
                value={text}
                onChange={handleTextChange}
            />
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleTextToSpeech}
            >
                Convert to Speech
            </button>
            {audioUrl && (
                <audio className="mt-4" controls>
                    <source src={audioUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};