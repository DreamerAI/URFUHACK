export type ApiResponseDto<T> = {
    data: T | null;
    status: number | null;
    code?: string;
  };
  