"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_route_1 = require("../modules/Books/books.route");
const members_route_1 = require("../modules/Members/members.route");
const borrow_route_1 = require("../modules/BorrowBooks/borrow.route");
const return_route_1 = require("../modules/BorrowBooks/return.route");
const router = (0, express_1.Router)();
const moduleRouter = [
    {
        path: '/books',
        route: books_route_1.BookRoutes,
    },
    {
        path: '/members',
        route: members_route_1.MemberRoutes,
    },
    {
        path: '/borrow',
        route: borrow_route_1.BorrowBookRoutes,
    },
    {
        path: '/return',
        route: return_route_1.ReturnBookRoutes,
    },
];
moduleRouter.forEach((route) => router.use(route.path, route.route));
exports.default = router;
