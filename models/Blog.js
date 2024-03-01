const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name_en: { type: String, required: true },
    name_ru: { type: String, required: true },
    description_en: { type: String, required: true },
    description_ru: { type: String, required: true },
    image1: { data: Buffer, contentType: String },
    image2: { data: Buffer, contentType: String },
    image3: { data: Buffer, contentType: String },
    time_added: { type: Date, default: Date.now },
    time_updated: { type: Date },
    time_deleted: { type: Date }
  }, { timestamps: true });
  
const BlogPost = mongoose.model('BlogPost', blogSchema);

module.exports = BlogPost;