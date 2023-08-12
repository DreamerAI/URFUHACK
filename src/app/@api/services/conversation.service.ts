import { ApiResponseDto } from "../dto/api-response.dto";
import { ConversationModel } from "../models/conversation.model";
import { ApiService } from "./base/api.service";

const BASE_PATH = "/conversation";

export const ConversationService = {
  create(): Promise<ApiResponseDto<ConversationModel>> {
    const path = `${BASE_PATH}/create`;
    return ApiService.post<ConversationModel>(path, {});
  },
};
