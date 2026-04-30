import fs from "fs";
import path from "path";
import { ENV } from "../../lib/ENV.js";
import {
  EMAIL_SUBJECT_WELCOME,
  EMAIL_SUBJECT_FORGOT_PASSWORD,
} from "../../constants/strings.ts";

const __dirname = path.resolve();

const welcomeEmail = fs.readFileSync(
  path.join(__dirname, "./src/emails/templates/welcomeEmail.html"),
  "utf8",
);

const forgotPassword = fs.readFileSync(
  path.join(__dirname, "./src/emails/templates/forgotPassword.html"),
  "utf8",
);

export const welcomeOptions = (email, name) => {
  const payload = {
    from: ENV.SMTP_USER,
    to: email,
    subject: EMAIL_SUBJECT_WELCOME,
    html: welcomeEmail.replace("{{name}}", name).replace("{{email}}", email),
  };
  return payload;
};

export const forgotPasswordOptions = (email) => {
  const payload = {
    from: ENV.SMTP_USER,
    to: email,
    subject: EMAIL_SUBJECT_FORGOT_PASSWORD,
    html: forgotPassword.replace(
      "{{resetLink}}",
      "https://example.com/reset-password",
    ),
  };
  return payload;
};
