import { useState } from "react";
import { Icon } from "../../shared/components/Icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ConversationModel } from "../../@api/models/conversation.model";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

export const Dashboard = () => {

    const user = useSelector((state: RootState) => state.userSlice.user);
    const [voiceText, setVoiceText] = useState(user?.description || "");
    const [conversationData, setConversationData] = useState<ConversationModel | null>(null);


    const [qrCode, setQrCode] = useState("");

    const userToken = useSelector((state: RootState) => state.userSlice.accessToken);

    const updateProfile = async () => {
        try {
            const response = await axios.put(
                "http://larek.itatmisis.ru:4000/users/me",
                {
                    description: voiceText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                },
            );
            setVoiceText(response.data.description);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTextVoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVoiceText(event.target.value);
    };

    const createChat = () =>
        axios.post('http://larek.itatmisis.ru:4000/conversation/create', null, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });

    const createQrCode = async () => {
        try {
            const response = await createChat();
            setConversationData(response.data);
            console.log("Чат создан");
            console.log(response.data.guest_token);
            const url = `http://localhost:3000/conversation/${response.data.conversation.conversation_id}/?access_token=${response.data.guest_token}`;
            setQrCode(url);
            console.log(url);
            return url;
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-h3">{user?.fio}</h2>
            <div className="flex items-center justify-center gap-9 bg-green-light p-4 border-2 border-accent-green rounded-lg">
                {qrCode ? <QRCode size={150} value={qrCode} className="flex" /> : <div onClick={async () => await createQrCode()} className="flex justify-center items-center w-36 h-36 bg-gray-300">
                    <span>Нажмите чтобы создать QR-приглашение</span>
                </div>
                }
                {qrCode ? <div className="flex flex-col items-center gap-4">
                    <span>Отсканируй меня для начала чата!</span>
                    <Link className=" bg-main-white py-3 px-4 border border-accent-green rounded-lg max-w-fit text-main-black-inactive"
                        to={`/conversation/${conversationData?.conversation.conversation_id}/`}
                    >Перейти в чат</Link></div> : null}
            </div>

            <div className="flex flex-col gap-2 bg-main-white p-2 rounded-lg">
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-main-black-inactive">Обо мне</span>
                    </div>
                    <button
                        className="py-2 px-3 border border-accent-green rounded-lg"
                    >
                        <Icon iconName="play" />
                    </button>
                </div>
                <input
                    className="border rounded-lg px-4 py-16 bg-main-gray"
                    name="email"
                    type="text"
                    placeholder="Введите описание"
                    value={voiceText}
                    onChange={handleTextVoiceChange}
                />


                <button className="py-3 px-4 border border-accent-green rounded-lg max-w-fit text-main-black-inactive" onClick={updateProfile}>
                    Сохранить
                </button>

            </div>
        </div>
    );
};
