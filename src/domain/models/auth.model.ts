export interface OauthRequest {
  token: string;
}

export interface AutorizacionResponse {
  id: number;
  userId: string;
  username: string;
  avatarUrl: string;
  token: string;
}
