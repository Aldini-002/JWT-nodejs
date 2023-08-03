import User from "../models/User.js";
import jwt from "jsonwebtoken";

// handle error
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    // incorrect email
    if (err.message === "incorrect email") {
        errors.email = "email tidak terdaftar";
    }

    // incorrect password
    if (err.message === "incorrect password") {
        errors.password = "password salah";
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "email sudah terdaftar";
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach((error) => {
            errors[error.properties.path] = error.properties.message;
        });
    }

    return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "net ninja secret", {
        expiresIn: maxAge,
    });
};

export const signup = (req, res) => res.render("auth/signup");

export const signin = (req, res) => res.render("auth/signin");

export const signupPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);

        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

export const signinPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signin(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

export const signout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};
