import React, { useState, useRef } from 'react';
import axios from 'axios';
import * as qs from 'qs';
import { Icon } from '../../shared/components/Icons';

export const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [audioKey, setAudioKey] = useState(0); // Counter variable for generating unique key

    const audioRef = useRef<HTMLAudioElement>(null); // Reference to the <audio> element

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleTextToSpeech = async () => {
        try {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
            const queryParams = qs.stringify({
                text,
                speaker: "xenia"
            });

            const url = `http://larek.itatmisis.ru:9000/text2audio?${queryParams}`;

            const response = await axios.post(url, null, { responseType: 'blob' });
            const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
            const newAudioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(newAudioUrl);
            setAudioKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error('Error converting text to speech:', error);
        }
    };

    const handlePlayAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-main-white gap-y-8">
            {audioUrl && (<div onClick={handlePlayAudio}><Icon iconName='play' width='50' height='50' /></div>)}
            <h2 className='text-h3'>Озвучка текста</h2>
            <textarea
                className="p-2 border rounded-lg w-64 h-32 mb-4 bg-main-gray"
                placeholder="Введите текст"
                value={text}
                onChange={handleTextChange}
            />
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleTextToSpeech}
            >
                Перевести в речь
            </button>
            {audioUrl && (
                <>
                    <audio className="mt-4 hidden" controls key={audioKey} ref={audioRef}>
                        <source src={audioUrl} type="audio/mp3" />
                    </audio>
                </>
            )}
        </div>
    );
};
