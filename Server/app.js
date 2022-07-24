import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect(
    "mongodb+srv://admin:admin1234@cluster0.i77fq.mongodb.net/BlogWeb?retryWrites=true&w=majority"
  )
  .then(() => app.listen(4000));
