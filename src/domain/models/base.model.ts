export interface BasePageRequest {
  start: number;
  limit: number;
  sort: string;
  palabraClave: string;
  totalCount: number;
}

export interface BasePageResponse<T> {
  elements: T[];
  start: number;
  sort: string;
  limit: number;
  totalCount: number;
}
