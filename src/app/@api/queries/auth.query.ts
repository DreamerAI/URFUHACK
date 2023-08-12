import { AuthLoginDto } from "../dto/auth-login.dto";
import { QueryResponseDto } from "../dto/query-response.dto";
import { TokenResponseDto } from "../dto/token-response.dto";
import { AuthService } from "../services/auth.service";


const LOGIN_QUERY_TOKEN = "login";

export const AuthQuery = {
  login(formState: AuthLoginDto): QueryResponseDto<TokenResponseDto> {
    const { data, isLoading, isError } = useMutation([LOGIN_QUERY_TOKEN, formState], AuthService.login);

    const token = data?.data as TokenResponseDto;

    return { data: token, isLoading, isError };
  },
};
