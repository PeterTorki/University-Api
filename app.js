import { config } from "dotenv";
config({ path: "./src/utils/.env" });
import express, { json, urlencoded } from "express";
const app = express();
import { connectDB } from "./Database/dbConnection.js";
import userRouter from "./src/modules/user/user.routes.js";
import departmentRouter from "./src/modules/department/department.routes.js";
import courseRouter from "./src/modules/course/course.routes.js";
import { authRouter } from "./src/modules/auth/auth.routes.js";
connectDB();
const port = process.env.PORT || 5000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/departments", departmentRouter);
app.use("/courses", courseRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
  res.send("Page Not Found");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
