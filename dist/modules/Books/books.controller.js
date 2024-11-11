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
exports.bookControllers = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const books_services_1 = require("./books.services");
const createBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_services_1.bookServices.createBookIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Book created successfully',
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_services_1.bookServices.getAllBooksFromDB();
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
        message: 'Books retrieved successfully',
        data: result,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const result = yield books_services_1.bookServices.getSingleBookFromDB(bookId);
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
        message: 'Book retrieved successfully',
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const result = yield books_services_1.bookServices.updateBookIntoDB(req.body, bookId);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Book updated successfully',
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const result = yield books_services_1.bookServices.deleteBookFromDB(bookId);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Book successfully deleted',
    });
}));
exports.bookControllers = {
    createBooks,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
