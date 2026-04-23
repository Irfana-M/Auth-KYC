import { Router } from "express";
import { container } from "../container";
import { TYPES } from "../types";

import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { ROUTES } from "../constants/routes";
import cookieParser from "cookie-parser";

const router = Router();

router.use(cookieParser());

const controller = container.get<UserController>(TYPES.UserController);


router.post(ROUTES.AUTH.REGISTER, controller.register);
router.post(ROUTES.AUTH.LOGIN, controller.login);
router.post(ROUTES.AUTH.REFRESH, controller.refresh);
router.post(ROUTES.AUTH.LOGOUT, controller.logout);


router.get(ROUTES.USER.GET_ALL, authMiddleware, controller.getUsers);

export default router;