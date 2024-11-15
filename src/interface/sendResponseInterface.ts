export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  success: boolean;
  status: number;
  message?: string;
  meta?: TMeta;
  data?: T;
};
