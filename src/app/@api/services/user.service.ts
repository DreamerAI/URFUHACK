import { ApiResponseDto } from "../dto/api-response.dto";
import { UserModel } from "../models";
import { ApiService } from "./base/api.service";

const BASE_PATH = "/users";

export const UserService = {
  getMe(): Promise<ApiResponseDto<UserModel>> {
    const path = `${BASE_PATH}/me`;
    return ApiService.get<UserModel>(path);
  },
};
