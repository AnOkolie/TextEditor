import { pool } from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.ts";
import { Prisma } from "../generated/prisma/client.ts";
import { ENV } from "../lib/ENV.js";
import { Resend } from "resend";
import {
  EMAIL_SUBJECT_FORGOT_PASSWORD,
  EMAIL_SUBJECT_WELCOME,
} from "../constants/strings.ts";
import React from "react";
import { transporter } from "../lib/email.ts";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
// import { forgotPassword as Forgot } from "../emailTemplates/forgotpassword.tsx";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!user || user.rowCount == 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const hashedPassowrd = user.rows[0].password;
    if (await bcrypt.compare(hashedPassword, password)) {
      const payload = {
        user_id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
      };
      const token = await jwt.sign(payload, ENV.JWT_SECRET, {
        expiresIn: "2h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      });
      return res.status(200).json({ message: "Login successful" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email and password are required" });
  }
  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(401).json({ error: "This email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    const payload = {
      user_id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = await jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: "2h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });
    const welcomeEmail = fs.readFileSync(
      path.join(__dirname, "./src/emailTemplates/welcomeEmail.html"),
      "utf8",
    );
    const welcomeOptions = {
      from: ENV.SMTP_USER,
      to: email,
      subject: EMAIL_SUBJECT_WELCOME,
      html: welcomeEmail.replace("{{name}}", name).replace("{{email}}", email),
    };
    transporter.sendMail(welcomeOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`Email sent: ${info.response}`);
      res.status(200).json({ message: "Welcome email sent" });
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(`error: ${error}`);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Specific error code, e.g., P2002 (Unique constraint failed)
      console.log(error.code);
      console.log(error.meta);
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({ error: "Email is required" });
  }
  console.log(`Received forgot password request for email: ${email}`);
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "No matching email" }); // dont actually send
    }

    const forgotPassword = fs.readFileSync(
      path.join(__dirname, "./src/emailTemplates/forgotPassword.html"),
      "utf8",
    );
    if (!forgotPassword) {
      console.log("Failed to read forgot password email template");
      return res.status(500).json({ error: "Internal server error" });
    }
    const forgotPasswordOptions = {
      from: ENV.SMTP_USER,
      to: email,
      subject: EMAIL_SUBJECT_FORGOT_PASSWORD,
      html: forgotPassword.replace(
        "{{resetLink}}",
        "https://example.com/reset-password",
      ),
    };
    transporter.sendMail(forgotPasswordOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`Email sent: ${info.response}`);
      res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
