import express from "express";

//routes
import postRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

//starting express
const app = express();

import cors from "cors";

//set cors
app.use(cors());

//allowing client to send json
app.use(express.json());

//use routes routes
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/posts", postRoutes)


//selecting port number
app.listen(8800, () => {
    console.log("connected!")
});