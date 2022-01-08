import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { 
        type: String,
        unique: true, 
        required:  true 
    },
    email: { 
        type: String, 
        unique: true,
        match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        required: true
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: String },
});

const User = mongoose.model('User',userSchema);
  
export default User;