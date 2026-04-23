"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../container");
const types_1 = require("../types");
const authMiddleware_1 = require("../middleware/authMiddleware");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const routes_1 = require("../constants/routes");
const router = (0, express_1.Router)();
const controller = container_1.container.get(types_1.TYPES.KycController);
router.post(routes_1.ROUTES.KYC.UPLOAD, authMiddleware_1.authMiddleware, uploadMiddleware_1.upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
]), controller.uploadKyc);
exports.default = router;
