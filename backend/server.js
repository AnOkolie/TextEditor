import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use(
  "/api",
  express
    .Router()
    .get("/", (req, res) => res.json({ message: "Welcome to the API" })),
);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
