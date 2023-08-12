import axios, {  AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponseDto } from "../../dto/api-response.dto";
import { env } from "../../../../env";
import { store } from "../../../state/store";

enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

const API = axios.create({
  baseURL: env.API_URL,
});

async function request<T>(type: HttpMethod, path: string, body?: Record<string, unknown>): Promise<ApiResponseDto<T>> {

  const token = store.getState().userSlice.accessToken;

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const params: [string, Record<string, unknown> | null, AxiosRequestConfig?] = [path, body || null, config].filter(Boolean) as [string, Record<string, unknown> | null, AxiosRequestConfig?];

  try {
    const response: AxiosResponse<T> = await API[type]<T>(...params);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    const response: AxiosResponse = (err as AxiosError).response as AxiosResponse;

    if (!response?.status && !response?.data) {
      const errorDetails = err instanceof Error ? `${err.message}\n${err.stack}` : JSON.stringify(err);
      throw new Error(`Ошибка сайта: Не удалось получить ответ от сервера. Подробности: ${errorDetails}`);
    }

    const { status, data } = response;
    return {
      status,
      data: null,
      code: data?.code,
    };
  }
}

export const ApiService = {
  get: async <T>(path: string): Promise<ApiResponseDto<T>> => {
    return request<T>(HttpMethod.GET, path, undefined);
  },
  post: async <T>(path: string, body: Record<string, unknown>): Promise<ApiResponseDto<T>> => {
    return request<T>(HttpMethod.POST, path, body);
  },
  put: async <T>(path: string, body: Record<string, unknown>): Promise<ApiResponseDto<T>> => {
    return request<T>(HttpMethod.PUT, path, body);
  },
  delete: async <T>(path: string, body: Record<string, unknown>): Promise<ApiResponseDto<T>> => {
    return request<T>(HttpMethod.DELETE, path, body);
  },
};
