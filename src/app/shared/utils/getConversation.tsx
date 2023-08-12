import axios from "axios";

export async function getConversation(token: string, id: number) {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        const response = await axios.get(`http://larek.itatmisis.ru:4000/conversation/${id}`, config);
        const data = response.data;
        return data
    } catch (error) {
        console.error(error);
    }
}