import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ConversationData } from "../../@api/models/messages.model";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { setUserToken } from "../../state/reducers";

export const Conversation = () => {
    const { id } = useParams();
    const [conversation, setConversationData] = useState<ConversationData>();
    const [newMessage, setNewMessage] = useState("");

    const userToken = useSelector((state: RootState) => state.userSlice.accessToken);
    const userId = useSelector((state: RootState) => state.userSlice.user?.id);

    const dispatch = useDispatch();

    const getConversation = async (token: string, conversationId: string) => {
        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };

            const response = await axios.get(`http://larek.itatmisis.ru:4000/conversation/${conversationId}`, config);
            const data = response.data;
            setConversationData(data);
        } catch (error) {
            console.error(error);
        }
    }

    const sendMessage = async () => {
        try {
            const senderToken = localStorage.getItem('access_token') || userToken;

            const config = {
                headers: {
                    Authorization: `Bearer ${senderToken}`,
                },
            };

            const response = await axios.post(`http://larek.itatmisis.ru:4000/conversation/${id}`, newMessage, config);
            console.log(response.data);
            setNewMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleNewMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');

        if (accessToken && id) {
            dispatch(setUserToken(accessToken));
            getConversation(accessToken, id);
        } else if (!accessToken && id) {
            getConversation(userToken, id);
        }
    }, [id, userToken, dispatch]);

    return (
        <>
            <div>
                {conversation?.messages.map((message, index) => (
                    <div key={index}>
                        <div className={`text-${message.sender_id === userId ? 'accent-green' : 'accent-ametist'}`}>
                            {message.content}
                        </div>
                    </div>
                ))}

                <div>
                    <div>
                        <input
                            className="bg-gray-200 p-4"
                            type="text"
                            placeholder="Enter your text here"
                            value={newMessage}
                            onChange={handleNewMessage}
                        />
                        <button type="submit" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </>
    );
};
