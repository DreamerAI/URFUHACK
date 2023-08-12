import { ApiService } from "./base/api.service";
import { UserRegistrationModel } from "../models";
import { TokenResponseDto } from "../dto/token-response.dto";
import { ApiResponseDto } from "../dto/api-response.dto";
import { AuthLoginDto } from "../dto/auth-login.dto";

const BASE_PATH = "/users";

export const AuthService = {
  login(data: AuthLoginDto): Promise<ApiResponseDto<TokenResponseDto>> {
    return ApiService.post<TokenResponseDto>(`${BASE_PATH}/token`, data);
  },


  create(data: UserRegistrationModel): Promise<ApiResponseDto<TokenResponseDto>> {
    const path = `${BASE_PATH}/create`;
    return ApiService.post<TokenResponseDto>(path, data);
  },
};
