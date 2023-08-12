import { useState, useEffect } from 'react';
import { configureHeaders } from '../../shared/utils/configureHeaders';
import { fetchData } from '../../shared/utils/fetchData';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Link } from 'react-router-dom';

interface Conversation {
    conversation_id: number;
    name: string | null;
    created_at: string;
    creator_id: number;
    guest_id: number;
}

export const Chats = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);

    const userToken = useSelector((state: RootState) => state.userSlice.accessToken);

    async function fetchConversations(token: string) {
        const config = configureHeaders(token);
        const response = await fetchData(`http://larek.itatmisis.ru:4000/conversation/created`, config);
        setConversations(response);
        console.log(response);
    }

    useEffect(() => {
        if (userToken) {
            fetchConversations(userToken);
        }
    }, [userToken]);


    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <h1 className="text-2xl font-semibold mb-4">Чаты</h1>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {conversations.map(conversation => (
                    <div key={conversation.conversation_id} className="py-3 px-4 border border-accent-green rounded-lg max-w-fit text-main-black-inactive">
                        <Link to={`/conversation/${conversation.conversation_id}`} className="text-xl font-semibold mb-2">
                            <p className="text-gray-700 mb-2">ID чата: {conversation.conversation_id}</p>
                            <p className="text-gray-700 mb-2">Создано: {conversation.created_at}</p>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
};
