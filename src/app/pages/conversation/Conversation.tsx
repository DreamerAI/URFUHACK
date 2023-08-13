import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { UserModel } from "../../@api/models";
import { configureHeaders } from "../../shared/utils/configureHeaders";
import { fetchData } from "../../shared/utils/fetchData";
import { ConversationData } from "../../@api/models/messages.model";
import { Icon } from "../../shared/components/Icons";


export const Conversation = () => {
    const { id } = useParams<{ id: string }>();

    const [conversationData, setConversationData] = useState<ConversationData | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [currentUser, setCurrentUser] = useState<UserModel | null>(null);

    const userToken = useSelector((state: RootState) => state.userSlice.accessToken);

    async function getCurrentUser(token: string) {
        console.log(token);
        const config = configureHeaders(token);
        const response = await fetchData('http://larek.itatmisis.ru:4000/users/me', config);
        setCurrentUser(response);
        console.log(response);
    }

    async function getConversation(token: string, conversationId: string) {
        const config = configureHeaders(token);
        const response = await fetchData(`http://larek.itatmisis.ru:4000/conversation/${conversationId}`, config);
        setConversationData(response);
        console.log(response);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token') ?? userToken ?? '';

        getCurrentUser(accessToken);
        // @ts-ignore
        getConversation(accessToken, id);

        const intervalId = setInterval(() => {
            // @ts-ignore
            getConversation(accessToken, id);
        }, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, [id, userToken]);

    const sendMessage = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const accessToken = urlParams.get('access_token') || userToken;
            // @ts-ignore
            const config = configureHeaders(accessToken);
            const response = await axios.post(`http://larek.itatmisis.ru:4000/conversation/${id}`, newMessage, config);
            console.log(response.data);
            // @ts-ignore
            getConversation(accessToken, id);
            setNewMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleNewMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };




    return (
        <>
            <div className="flex flex-col justify-between overflow-y-scroll h-screen">
                <div className="flex flex-col gap-2">
                    {conversationData?.messages.map((message, index) => (
                        <div
                            className={`flex ${currentUser?.id === message.sender_id ? 'justify-end' : 'justify-start'
                                }`}
                            key={index}
                        >
                            <div
                                className={`py-2 px-4 ${currentUser?.id === message.sender_id
                                    ? 'bg-accent-green float-right'
                                    : 'bg-white shadow-main-black-inactive'
                                    } w-2/5 rounded-tl-lg rounded-br-lg rounded-bl-sm`}
                            >
                                <span className="whitespace-normal">{message.content}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center p-2 bg-main-white rounded-lg mt-3 bottom-0 sticky">
                    <input
                        className="bg-gray-200 p-2 rounded-l-lg w-full"
                        type="text"
                        placeholder="Текст"
                        value={newMessage}
                        onChange={handleNewMessage}
                    />
                    <button
                        className="text-white p-2 rounded-r-lg ml-2"
                        type="submit"
                        onClick={sendMessage}
                    >
                        <Icon iconName="send" />
                    </button>
                </div>
            </div>



        </>
    );
};
