"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const books_controller_1 = require("./books.controller");
const books_validation_1 = require("./books.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(books_validation_1.bookValidations.createBookValidationSchema), books_controller_1.bookControllers.createBooks);
router.get('/:bookId', books_controller_1.bookControllers.getSingleBook);
router.put('/:bookId', (0, validateRequest_1.default)(books_validation_1.bookValidations.updateBookValidationSchema), books_controller_1.bookControllers.updateBook);
router.delete('/:bookId', books_controller_1.bookControllers.deleteBook);
router.get('/', books_controller_1.bookControllers.getAllBooks);
exports.BookRoutes = router;
