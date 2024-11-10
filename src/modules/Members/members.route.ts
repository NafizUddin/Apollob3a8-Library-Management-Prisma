import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { memberControllers } from './members.controller';
import { memberValidations } from './members.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(memberValidations.createMemberValidationSchema),
  memberControllers.createMembers,
);

router.get('/:memberId', memberControllers.getSingleMember);

router.put(
  '/:memberId',
  validateRequest(memberValidations.updateMemberValidationSchema),
  memberControllers.updateMember,
);

router.delete('/:memberId', memberControllers.deleteMember);

router.get('/', memberControllers.getAllMembers);

export const MemberRoutes = router;
