import prisma from '../../utils/prisma';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const borrowBooksFromDB = async (payload: {
  bookId: string;
  memberId: string;
}) => {
  const book = await prisma.book.findUniqueOrThrow({
    where: {
      bookId: payload.bookId,
    },
  });

  await prisma.member.findUniqueOrThrow({
    where: {
      memberId: payload.memberId,
    },
  });

  if (book.availableCopies <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'No available copies of this book.',
    );
  }

  const [, borrowRecord] = await prisma.$transaction([
    prisma.book.update({
      where: { bookId: payload.bookId },
      data: { availableCopies: book.availableCopies - 1 },
    }),

    prisma.borrowRecord.create({
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
};

const getOverdueBorrowListFromDB = async () => {
  const currentDate = new Date();

  const overdueBorrowBooks = await prisma.borrowRecord.findMany({
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
    const overdueDays = Math.ceil(
      (currentDate.getTime() - new Date(record.borrowDate).getTime()) /
        (1000 * 3600 * 24),
    );

    return {
      borrowId: record.borrowId,
      bookTitle: record.book.title,
      borrowerName: record.member.name,
      overdueDays,
    };
  });

  return overdueBooks;
};

export const borrowServices = {
  borrowBooksFromDB,
  getOverdueBorrowListFromDB,
};
