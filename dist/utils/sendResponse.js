"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    return res.status(data === null || data === void 0 ? void 0 : data.status).json({
        success: data === null || data === void 0 ? void 0 : data.success,
        status: data === null || data === void 0 ? void 0 : data.status,
        message: data === null || data === void 0 ? void 0 : data.message,
        meta: data === null || data === void 0 ? void 0 : data.meta,
        data: data === null || data === void 0 ? void 0 : data.data,
    });
};
exports.default = sendResponse;