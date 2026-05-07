import { BasePageRequest, BasePageResponse } from "./base.model";

export interface FindGuildsRequest extends BasePageRequest {
  userDcId: number;
  guildName: string;
}

export interface GuildElement {
  guildUserId: number;
  guildId: number;
  userId: number;
  guild: string;
  guildDcId: number;
  username: string;
  userDcId: number;
}

export type FindGuildsResponse = BasePageResponse<GuildElement>;
