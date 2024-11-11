"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const members_controller_1 = require("./members.controller");
const members_validation_1 = require("./members.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(members_validation_1.memberValidations.createMemberValidationSchema), members_controller_1.memberControllers.createMembers);
router.get('/:memberId', members_controller_1.memberControllers.getSingleMember);
router.put('/:memberId', (0, validateRequest_1.default)(members_validation_1.memberValidations.updateMemberValidationSchema), members_controller_1.memberControllers.updateMember);
router.delete('/:memberId', members_controller_1.memberControllers.deleteMember);
router.get('/', members_controller_1.memberControllers.getAllMembers);
exports.MemberRoutes = router;
