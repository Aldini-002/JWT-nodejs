import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, "net ninja secret", (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/signin");
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/signin");
    }
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

export { auth, checkUser };
