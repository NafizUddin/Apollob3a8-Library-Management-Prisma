import { ErrorRequestHandler } from 'express';
import config from '../config';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong!';
  let error = err;

  // Prisma validation error (usually thrown for invalid data formats)
  if (err instanceof Prisma.PrismaClientValidationError) {
    message = 'Validation Error';
    error = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Prisma error code 'P2002' indicates a unique constraint violation (duplicate key error)
    if (err.code === 'P2002') {
      message = 'Duplicate Key error';
      error = err.meta;
    }
  }
  // throw new AppError validation
  else if (err instanceof AppError) {
    message = err?.message;
    error = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
