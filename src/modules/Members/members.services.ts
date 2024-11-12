import { Member, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';

const createMembersIntoDB = async (
  payload: Prisma.MemberCreateInput,
): Promise<Member> => {
  const result = await prisma.member.create({
    data: payload,
  });

  return result;
};

const getAllMembersFromDB = async () => {
  const result = await prisma.member.findMany();
  return result;
};

const getSingleMemberFromDB = async (memberId: string) => {
  const result = await prisma.member.findUniqueOrThrow({
    where: {
      memberId,
    },
  });

  return result;
};

const updateMemberIntoDB = async (
  payload: Prisma.MemberUpdateInput,
  memberId: string,
) => {
  await prisma.member.findUniqueOrThrow({
    where: { memberId },
  });

  const result = await prisma.member.update({
    where: { memberId },
    data: payload,
  });
  return result;
};

const deleteMemberFromDB = async (memberId: string) => {
  await prisma.member.findUniqueOrThrow({
    where: { memberId },
  });

  const result = await prisma.$transaction(async (tx) => {
    await tx.borrowRecord.deleteMany({
      where: { memberId },
    });

    return await tx.member.delete({
      where: { memberId },
    });
  });

  return result;
};

export const memberServices = {
  createMembersIntoDB,
  getAllMembersFromDB,
  getSingleMemberFromDB,
  updateMemberIntoDB,
  deleteMemberFromDB,
};
