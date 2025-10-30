const express = require("express");
const zod = require('zod');
const { signupdb } = require("../../db");
const router = express.Router();
const app = express();
app.use(express.json());

const signupAuth = zod.object({
    firstname: zod.string().min(1, "First name is required"),
    lastname: zod.string().min(1, "Last name is required"),
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(3, "Password must be at least 6 characters long")
});

router.post('/', async function (req, res) {
    const signupBody = req.body;
    const upAuth = signupAuth.safeParse(signupBody);

    if (!upAuth.success) {
        return res.status(400).json({
            msg1: "Invalid input",
            errors: upAuth.error.errors // Send validation errors to frontend
        });
    }

    const existingUser = await signupdb.findOne({
        email: req.body.email
    });

    if (existingUser) {
        return res.status(409).json({
            msg2: "User already exists"
        });
    }

    await signupdb.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });

    return res.status(200).json({
        message: "User created successfully",
    });
});

module.exports = router;
