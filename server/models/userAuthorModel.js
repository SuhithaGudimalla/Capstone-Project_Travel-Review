const mongoose = require("mongoose");

// Define User or Author schema
const userAuthorSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImageUrl: {
        type: String, // Ensure this is a string storing the image URL
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { strict: "throw" });

// Create model for user author schema
const UserAuthor = mongoose.model('userauthor', userAuthorSchema);

// Export
module.exports = UserAuthor;
