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
exports.borrowServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_1 = __importDefault(require("http-status"));
const borrowBooksFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUniqueOrThrow({
        where: {
            bookId: payload.bookId,
        },
    });
    yield prisma_1.default.member.findUniqueOrThrow({
        where: {
            memberId: payload.memberId,
        },
    });
    if (book.availableCopies <= 0) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'No available copies of this book.');
    }
    const [, borrowRecord] = yield prisma_1.default.$transaction([
        prisma_1.default.book.update({
            where: { bookId: payload.bookId },
            data: { availableCopies: book.availableCopies - 1 },
        }),
        prisma_1.default.borrowRecord.create({
            data: {
                borrowDate: new Date(),
                book: { connect: { bookId: payload.bookId } },
                member: { connect: { memberId: payload.memberId } },
            },
            select: {
                borrowId: true,
                bookId: true,
                memberId: true,
                borrowDate: true,
            },
        }),
    ]);
    return borrowRecord;
});
const returnBooksToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.borrowRecord.findUniqueOrThrow({
        where: { borrowId: payload.borrowId },
    });
    const result = yield prisma_1.default.borrowRecord.update({
        where: { borrowId: payload.borrowId },
        data: {
            returnDate: new Date(),
        },
    });
    return result;
});
const getOverdueBorrowListFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const overdueBorrowBooks = yield prisma_1.default.borrowRecord.findMany({
        where: {
            returnDate: null,
            borrowDate: {
                lt: new Date(currentDate.setDate(currentDate.getDate() - 14)), //Taking those dates where borrowDate is earlier than (less than) the date that’s exactly 14 days ago from current date.
            },
        },
        include: {
            book: true,
            member: true,
        },
    });
    const overdueBooks = overdueBorrowBooks.map((record) => {
        const overdueDays = Math.ceil((currentDate.getTime() - new Date(record.borrowDate).getTime()) /
            (1000 * 3600 * 24));
        return {
            borrowId: record.borrowId,
            bookTitle: record.book.title,
            borrowerName: record.member.name,
            overdueDays,
        };
    });
    return overdueBooks;
});
exports.borrowServices = {
    borrowBooksFromDB,
    returnBooksToDB,
    getOverdueBorrowListFromDB,
};
