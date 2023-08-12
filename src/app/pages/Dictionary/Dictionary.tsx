// src/components/DictionaryApp.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../state/store';
import { addWord } from '../../state/reducers/dictionary-slice.reducer';

export const DictionaryApp = () => {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const dispatch = useDispatch();
    const dictionary = useSelector((state: RootState) => state.dictionary.words);

    const handleAddWord = () => {
        dispatch(addWord({ word, definition }));
        setWord('');
        setDefinition('');
    };

    const handleSendToApi = async () => {
        try {
            await axios.post('/api/endpoint', dictionary);
            console.log('Dictionary sent to the API');
        } catch (error) {
            console.error('Error sending dictionary to API:', error);
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Word"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    className="border rounded p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Definition"
                    value={definition}
                    onChange={(e) => setDefinition(e.target.value)}
                    className="border rounded p-2 mr-2"
                />
                <button onClick={handleAddWord} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Word
                </button>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Dictionary</h2>
                <ul className="list-disc pl-6">
                    {Object.entries(dictionary).map(([word, definition]) => (
                        <li key={word}>
                            <strong>{word}:</strong> {definition}
                        </li>
                    ))}
                </ul>
                <button onClick={handleSendToApi} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                    Send to API
                </button>
            </div>
        </div>
    );
};

export default DictionaryApp;
