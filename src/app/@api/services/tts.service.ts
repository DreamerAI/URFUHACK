import { ApiResponseDto } from "../dto/api-response.dto";
import { VoiceResponseDto } from "../dto/voice-response.dto";
import { SberApiService } from "./base/sberapi.service";

export const VoiceService = {
  toVoice(text: string): Promise<ApiResponseDto<ArrayBuffer>> {
    const data: VoiceResponseDto = {
      text: text
    };
    return SberApiService.post<ArrayBuffer>(data);
  }
};
