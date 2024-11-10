import { Response } from 'express';
import { TResponse } from '../interface/sendResponseInterface';

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data?.status).json({
    success: data?.success,
    status: data?.status,
    message: data?.message,
    meta: data?.meta,
    data: data?.data,
  });
};

export default sendResponse;
