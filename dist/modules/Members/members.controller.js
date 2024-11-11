"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const members_services_1 = require("./members.services");
const createMembers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield members_services_1.memberServices.createMembersIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Member created successfully',
        data: result,
    });
}));
const getAllMembers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield members_services_1.memberServices.getAllMembersFromDB();
    if (result === null) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            status: http_status_1.default.NOT_FOUND,
            message: 'No Data Found',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Members retrieved successfully',
        data: result,
    });
}));
const getSingleMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const result = yield members_services_1.memberServices.getSingleMemberFromDB(memberId);
    if (result === null) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            status: http_status_1.default.NOT_FOUND,
            message: 'No Data Found!',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Member retrieved successfully',
        data: result,
    });
}));
const updateMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const result = yield members_services_1.memberServices.updateMemberIntoDB(req.body, memberId);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Member updated successfully',
        data: result,
    });
}));
const deleteMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const result = yield members_services_1.memberServices.deleteMemberFromDB(memberId);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Member successfully deleted',
    });
}));
exports.memberControllers = {
    createMembers,
    getAllMembers,
    getSingleMember,
    updateMember,
    deleteMember,
};
