import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from "../validation/authSchemas.js";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from "../controllers/authController.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = Router();

router.post(
  "/register",
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

router.post("/logout", ctrlWrapper(logoutUserController));

router.post("/refresh", ctrlWrapper(refreshUserSessionController));

router.post(
  "/send-reset-email",
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController)
);

router.post(
  "/reset-pwd",
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);

router.get("/get-oauth-url", ctrlWrapper(getGoogleOAuthUrlController));

router.post(
  "/confirm-oauth",
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController)
);

export default router;
