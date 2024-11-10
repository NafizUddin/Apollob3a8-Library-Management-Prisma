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

// const getAllBooks = catchAsync(async (req, res) => {
//   const result = await ServicesOfCarService.getAllServicesFromDB(req.query);

//   if (result === null) {
//     return sendResponse(res, {
//       success: false,
//       statusCode: httpStatus.NOT_FOUND,
//       message: 'No Data Found',
//       data: [],
//     });
//   }

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Services retrieved successfully',
//     data: result,
//   });
// });

// const getSingleBook = catchAsync(async (req, res) => {
//   const id = req.params.id;

//   const result = await ServicesOfCarService.getSingleServiceFromDB(id);

//   if (result === null) {
//     return sendResponse(res, {
//       success: false,
//       statusCode: httpStatus.NOT_FOUND,
//       message: 'No Data Found!',
//       data: [],
//     });
//   }

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Service retrieved successfully',
//     data: result,
//   });
// });

// const updateBook = catchAsync(async (req, res) => {
//   const id = req.params.id;

//   const result = await ServicesOfCarService.updateServiceIntoDB(req.body, id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Service updated successfully',
//     data: result,
//   });
// });

// const deleteBook = catchAsync(async (req, res) => {
//   const id = req.params.id;

//   const result = await ServicesOfCarService.deleteServiceFromDB(id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Service deleted successfully',
//     data: result,
//   });
// });

export const bookControllers = {
  createBooks,
  //   getAllBooks,
  //   getSingleBook,
  //   updateBook,
  //   deleteBook,
};
