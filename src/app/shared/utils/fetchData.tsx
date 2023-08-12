import axios, { AxiosRequestConfig } from "axios";

export async function fetchData(url: string, config: AxiosRequestConfig): Promise<any> {
    try {
        console.log(url)
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}