import React, { useState } from 'react';
import axios from 'axios';

export const Translate = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [answer, setAnswer] = useState([]);
    const [includeGpt, setIncludeGpt] = useState(false); // Add includeGpt state

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('video', selectedFile);

            try {
                const response = await axios.post('http://larek.itatmisis.ru:9000/sl2text', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    params: {
                        gpt: includeGpt, // Use includeGpt state value
                    },
                });
                setAnswer(response.data.data)
                console.log('Upload success!', response.data);
            } catch (error) {
                console.error('Upload failed!', error);
            }
        }
    };

    const handleCheckboxChange = () => {
        setIncludeGpt(!includeGpt); // Toggle includeGpt state
    };

    return (
        <div>
            <div className="p-4 flex flex-col justify-center items-center gap-8">
                <input type="file" onChange={handleFileChange} />
                <label>
                    GPT:
                    <input type="checkbox" checked={includeGpt} onChange={handleCheckboxChange} />
                </label>
                <button
                    className="py-3 px-4 border border-accent-green rounded-lg max-w-fit text-main-black-inactive"
                    onClick={handleUpload}
                >
                    Отправить видео
                </button>
            </div>

            <h3>Слова, которые были в видео</h3>
            <div className='flex justify-center gap-6 mt-10'>
                {answer?.map((word, index) => (
                    <div key={index} className="py-3 px-4 border border-accent-green rounded-lg max-w-fit text-main-black-inactive">
                        {word}
                    </div>
                ))}
            </div>

        </div>
    );
};
