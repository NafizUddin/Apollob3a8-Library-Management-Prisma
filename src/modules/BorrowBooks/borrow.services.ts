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

export const borrowServices = {
  borrowBooksFromDB,
};
