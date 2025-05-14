import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: { 
        type: String,
        required: true,
    }
},{timestamps: true});

const User = mongoose.model('User', UserSchema);
export default User;
