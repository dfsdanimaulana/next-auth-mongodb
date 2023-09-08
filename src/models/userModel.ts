import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiry: {
        type: Date
    },
    verifyToken: {
        type: String
    },
    verifyExpiry: {
        type: Date
    }
})

// Define a Mongoose model for the 'User' entity.
// We check if the model already exists (in case it's defined elsewhere) and use it, or create a new one if it doesn't exist.
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User
