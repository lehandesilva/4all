import express from "express";
import bodyParser from "body-parser";
import coursesRouter from "./routes/courses";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import categoriesRouter from "./routes/categories";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_ORIGIN, // Next.js frontend origin
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/course", coursesRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/", (req, res) => {
  res.status(200).send("Hope this bitch ass works");
});

app.listen(80, () => {
  console.log("Server is running on port 80");
});
