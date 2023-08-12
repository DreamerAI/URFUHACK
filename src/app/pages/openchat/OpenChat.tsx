import { useEffect } from "react";
import { Link } from "react-router-dom";
export const OpenChat = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');

        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
        }
    }, []);
    return (
        <div className="w-full flex flex-col gap-3">
            <Link to={`/chat?access_token=${localStorage.getItem('access_token')}`} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        </div>
    );
};
