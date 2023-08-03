import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cookiesRoutes from "./routes/cookiesRoutes.js";
import cookieParser from "cookie-parser";
import { auth, checkUser } from "./middleware/authMiddleware.js";

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

const URI = "mongodb+srv://kuminv3421064:.kumin0000@nodetuts.tjlspih.mongodb.net/node-jwt";
mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((data) => app.listen(3000))
    .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", auth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
app.use(cookiesRoutes);
