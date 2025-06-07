import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { UsersCollection } from "../models/userModel.js";
import { generateToken } from "../utils/tokens.js";
import { createSession } from "../utils/createSession.js";
import { SessionsCollection } from "../models/sessionModel.js";
import jwt from "jsonwebtoken";
import { SMTP, TEMPLATES_DIR } from "../constants/index.js";
import { getEnvVar } from "../utils/getEnvVar.js";
import { sendEmail } from "../utils/sendMail.js";
import handlebars from "handlebars";
import path from "node:path";
import fs from "node:fs/promises";

export const registerUser = async (payload) => {
  const existingUser = await UsersCollection.findOne({ email: payload.email });

  if (existingUser) {
    throw createHttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return UsersCollection.create({
    ...payload,
    password: hashedPassword,
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError.Unauthorized("Email or password is incorrect");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw createHttpError.Unauthorized("Email or password is incorrect");
  }

  const accessToken = generateToken();
  const refreshToken = generateToken();

  const session = await createSession(user._id, accessToken, refreshToken);

  return {
    accessToken,
    refreshToken,
    _id: session._id,
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, "Session not found");
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, "Session token expired");
  }

  const accessToken = generateToken();
  const newRefreshToken = generateToken();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  const newSession = await createSession(
    session.userId,
    accessToken,
    newRefreshToken
  );

  return newSession;
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const resetToken = jwt.sign(
    {
      sub: user._id.toString(),
      email,
    },
    getEnvVar("JWT_SECRET"),
    {
      expiresIn: "5m",
    }
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    "reset-password-email.html"
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${getEnvVar("APP_DOMAIN")}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: getEnvVar(SMTP.SMTP_FROM),
      to: email,
      subject: "Reset your password",
      html,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    throw createHttpError(
      500,
      "Failed to send the email, please try again later."
    );
  }

  return resetToken;
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, getEnvVar("JWT_SECRET"));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword }
  );

  await SessionsCollection.deleteMany({ userId: user._id });
};
