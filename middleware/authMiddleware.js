import jwt from "jsonwebtoken";
import User from "../models/User.js"
export const protect = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader?.startsWith("Bearer ")){
        res.status(401).json({message: 'No Token Provided'});
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid Token',error:error.message });
    }
};