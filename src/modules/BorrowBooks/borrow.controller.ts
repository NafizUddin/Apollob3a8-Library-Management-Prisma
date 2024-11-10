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

export const borrowControllers = {
  borrowBooks,
};
