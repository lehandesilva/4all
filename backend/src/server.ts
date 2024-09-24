import express from "express";
import bodyParser from "body-parser";
import coursesRouter from "./routes/courses";
import authRouter from "./routes/auth";

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/course", coursesRouter);
app.use("/auth", authRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
