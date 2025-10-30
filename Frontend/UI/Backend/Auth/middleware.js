const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config()

const authMiddleware = (req , res , next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(411).json({
            message : "Invalid Signature"
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JwtCode);
        req.dataId = decoded.userId  // req is use to pass data from middleware and dataId is like variable name and decoded.userId is we take userId which we sign it as a jwt 
        next()
    } catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(403).json({
            msg : "Invalid Signature"
        })
    }
}

module.exports = authMiddleware;