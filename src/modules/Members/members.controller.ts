import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { memberServices } from './members.services';

const createMembers = catchAsync(async (req, res) => {
  const result = await memberServices.createMembersIntoDB(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Member created successfully',
    data: result,
  });
});

const getAllMembers = catchAsync(async (req, res) => {
  const result = await memberServices.getAllMembersFromDB();

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
    message: 'Members retrieved successfully',
    data: result,
  });
});

const getSingleMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;

  const result = await memberServices.getSingleMemberFromDB(memberId);

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
    message: 'Member retrieved successfully',
    data: result,
  });
});

const updateMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;

  const result = await memberServices.updateMemberIntoDB(req.body, memberId);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Member updated successfully',
    data: result,
  });
});

const deleteMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;

  const result = await memberServices.deleteMemberFromDB(memberId);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Member successfully deleted',
  });
});

export const memberControllers = {
  createMembers,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
};
