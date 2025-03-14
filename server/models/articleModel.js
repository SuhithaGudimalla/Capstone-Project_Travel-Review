const mongoose = require("mongoose");

// Create author schema inside article
const authorDataSchema = new mongoose.Schema({
    nameOfAuthor: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String, // Ensure this stores image URLs correctly
        required: false
    }
}, { strict: "throw" });

// Create user comment schema
const userCommentSchema = new mongoose.Schema({
    nameOfUser: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { strict: "throw" });

// Create Article schema
const articleSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    imageUrl: String, // ✅ Store image URL
    dateOfCreation: String,
    dateOfModification: String,
    authorData: {
        nameOfAuthor: String,
        email: String,
        profileImageUrl: String,
    },
    comments: [
        {
            nameOfUser: String,
            comment: String,
        }
    ],
    isArticleActive: Boolean
});

// Create model for article
const Article = mongoose.model('article', articleSchema);

// Export
module.exports = Article;
