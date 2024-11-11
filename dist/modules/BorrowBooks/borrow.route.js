"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const borrow_controller_1 = require("./borrow.controller");
const borrow_validation_1 = require("./borrow.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(borrow_validation_1.borrowBookValidations.createBorrowBookValidationSchema), borrow_controller_1.borrowControllers.borrowBooks);
router.get('/overdue', borrow_controller_1.borrowControllers.getOverdueBorrowList);
exports.BorrowBookRoutes = router;