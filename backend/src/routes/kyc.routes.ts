import { Router } from "express";
import { container } from "../container";
import { TYPES } from "../types";
import { KycController } from "../controllers/kyc.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";
import { ROUTES } from "../constants/routes";

const router = Router();

const controller = container.get<KycController>(TYPES.KycController);

router.post(
  ROUTES.KYC.UPLOAD,
  authMiddleware,   
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  controller.uploadKyc
);

export default router;