import { config } from "dotenv";
config();

import express, { json, urlencoded } from "express";
import cors from "cors"; // ✅ import cors

import { connectDB } from "./Database/dbConnection.js";
import userRouter from "./src/modules/user/user.routes.js";
import departmentRouter from "./src/modules/department/department.routes.js";
import courseRouter from "./src/modules/course/course.routes.js";
import { authRouter } from "./src/modules/auth/auth.routes.js";

const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to database
connectDB();

// ✅ Enable CORS before routes
app.use(
  cors({
    origin: [
      "http://localhost:4200", // Angular local dev
      "https://your-frontend.vercel.app", // (optional) your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Enable body parsers
app.use(json());
app.use(urlencoded({ extended: true }));

// ✅ API routes
app.use("/users", userRouter);
app.use("/departments", departmentRouter);
app.use("/courses", courseRouter);
app.use("/auth", authRouter);

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
