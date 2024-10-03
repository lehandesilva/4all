import express from "express";
import bodyParser from "body-parser";
import coursesRouter from "./routes/courses";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Next.js frontend origin
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/course", coursesRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
