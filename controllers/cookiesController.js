import cookieParser from "cookie-parser";

export const cookiesSet = (req, res) => {
    res.cookie("newUser", false);
    res.cookie("isEmployee", true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    res.send("Kamu mendapatkan cookies!");
};

export const cookiesGet = (req, res) => {
    const cookies = req.cookies;
    console.log(cookies.newUser);

    res.json(cookies);
};
