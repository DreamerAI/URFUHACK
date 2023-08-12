export interface QueryResponseDto<T> {
    data: T;
    isLoading: boolean;
    isError: boolean;
  }
  