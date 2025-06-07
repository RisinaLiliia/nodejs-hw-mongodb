import path from "node:path";

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const SMTP = {
  SMTP_HOST: "SMTP_HOST",
  SMTP_PORT: "SMTP_PORT",
  SMTP_USER: "SMTP_USER",
  SMTP_PASSWORD: "SMTP_PASSWORD",
  SMTP_FROM: "SMTP_FROM",
};

export const TEMPLATES_DIR = path.join(process.cwd(), "src", "templates");

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), "tmp");
export const UPLOAD_DIR = path.join(process.cwd(), "uploads");
