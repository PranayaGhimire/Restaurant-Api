import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req,res) => {
    const {username,password,role} = req.body;
    const existing = await User.findOne( {username} );
    if (existing) return res.status(400).json({ message: "Username exists" });

    const hashed = await bcrypt.hash(password,10);
    const user = new User({
        username,
        password:hashed,
        role
    });
    await user.save();
    res.status(201).json({ message: 'User Registered Successfully' });
};

export const login = async (req,res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username});
  
    if(!user)
        res.status(400).json({message: 'Invalid Credentials'});
    const match = await bcrypt.compare(password,user.password);
    if (!match)
        res.status(400).json({ message: 'Invalid Credentials'});
    const token  = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn: "1d"
    });
    res.json({
        message: 'User Logged In Successfully',
        token,
        data:user
    })
};