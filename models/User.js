import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        uniquer:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    role: {
        type:String,
        enum:['user','admin'], default:"user"
    }
});

export default mongoose.model('User',userSchema);