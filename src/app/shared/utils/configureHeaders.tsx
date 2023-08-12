import { AxiosRequestConfig } from "axios";

export function configureHeaders(token: string): AxiosRequestConfig {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}