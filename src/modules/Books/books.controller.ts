/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookServices } from './books.services';

const createBooks = catchAsync(async (req, res) => {
  const result = await bookServices.createBookIntoDB(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req, res) => {
  const result = await bookServices.getAllBooksFromDB();

  if (result === null) {
    return sendResponse(res, {
      success: false,
      status: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Books retrieved successfully',
    data: result,
  });
});

const getSingleBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;

  const result = await bookServices.getSingleBookFromDB(bookId);

  if (result === null) {
    return sendResponse(res, {
      success: false,
      status: httpStatus.NOT_FOUND,
      message: 'No Data Found!',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book retrieved successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;

  const result = await bookServices.updateBookIntoDB(req.body, bookId);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;

  const result = await bookServices.deleteBookFromDB(bookId);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book successfully deleted',
  });
});

export const bookControllers = {
  createBooks,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
