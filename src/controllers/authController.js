import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
} from "../services/auth.js";
import { ONE_DAY } from "../constants/index.js";
import createHttpError from "http-errors";

const setupSession = (res, session, maxAge = ONE_DAY) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + maxAge),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + maxAge),
  });
};

export const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const session = await loginUser(req.body);
    setupSession(res, session);
    res.json({
      status: 200,
      message: "Login successfully",
      data: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUserController = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    if (sessionId) {
      await logoutUser(sessionId);
    }

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const refreshUserSessionController = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      throw createHttpError(401, "Missing session or refresh token cookies");
    }

    const session = await refreshUsersSession({ sessionId, refreshToken });

    setupSession(res, session);

    res.json({
      status: 200,
      message: "Successfully refreshed a session!",
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
