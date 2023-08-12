import axios, {  AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponseDto } from "../../dto/api-response.dto";
import { env } from "../../../../env";

enum HttpMethod {
  GET = "get",
  POST = "post",
}

const API = axios.create({
  baseURL: env.SBER_API,
});

async function request<T>(type: HttpMethod, body?: Record<string, unknown>): Promise<ApiResponseDto<T>> {

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: env.SBER_TOKEN,
    },
  };

  const params: [string, Record<string, unknown> | null, AxiosRequestConfig?] = [body || null, config].filter(Boolean) as [string, Record<string, unknown> | null, AxiosRequestConfig?];

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

export const SberApiService = {
  get: async <T>(): Promise<ApiResponseDto<T>> => {
    return request<T>(HttpMethod.GET, undefined);
  },
  post: async <T>( body: Record<string, unknown>): Promise<ApiResponseDto<T>> => {
    return request<T>(HttpMethod.POST, body);
  },
};
