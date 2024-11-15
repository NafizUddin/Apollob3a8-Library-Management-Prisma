/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { borrowServices } from './borrow.services';

const borrowBooks = catchAsync(async (req, res) => {
  const result = await borrowServices.borrowBooksFromDB(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book borrowed successfully',
    data: result,
  });
});

const returnBooks = catchAsync(async (req, res) => {
  const result = await borrowServices.returnBooksToDB(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book returned successfully',
  });
});

const getOverdueBorrowList = catchAsync(async (req, res) => {
  const result = await borrowServices.getOverdueBorrowListFromDB();

  if (result.length === 0) {
    return sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: 'No overdue books',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Overdue borrow list fetched',
    data: result,
  });
});

export const borrowControllers = {
  borrowBooks,
  returnBooks,
  getOverdueBorrowList,
};
