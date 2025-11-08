const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require('jsonwebtoken');
const { signupdb } = require("../../db");
const dotenv = require("dotenv");
dotenv.config();

const signinAuth = zod.object({
    email: zod.string().email().min(1, "Invalid email"),
    password: zod.string().min(1, "Please enter password")
});

router.post('/signin', async function(req, res) {
    try {
        const signinBody = req.body;
        const inAuth = signinAuth.safeParse(signinBody);

        if (!inAuth.success) {
            return res.status(411).json({ msg: "Wrong input" });
        }

        const foundUser = await signupdb.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (!foundUser) {
            return res.status(401).json({
                msg: "Unauthorized user. Please go to signup page"
            });
        }

        const payload = {
            userId: foundUser._id,
            name: `${foundUser.firstname} ${foundUser.lastname}`,
            email: foundUser.email
        };

        const token = jwt.sign(payload, process.env.JwtCode, { expiresIn: "7d" });

        return res.status(200).json({
            message: "You have successfully logged in",
            token
        });
    } catch (error) {
        console.error("Signin Error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
