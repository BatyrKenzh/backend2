const express = require('express');
const router = express.Router();
const multer = require('multer');
const { ensureAuthenticated } = require('../middlewares/middlewares');
const BlogPost = require('../models/Blog'); // Adjust the path according to your project structure


// Set up Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Display all blog posts
router.get('/blog', ensureAuthenticated, async (req, res) => {
    try {
        const posts = await BlogPost.find({}); // You might want to add pagination
        res.render('blog', {
            posts: posts,
            isAdmin: req.session.user && req.session.user.isAdmin,
            loggedIn: !!req.session.user,
            translations: res.locals.translations,
            language: res.locals.language
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).send('Error loading blog page');
    }
});

// Route to display a form for adding a new post (Accessible by admins)
router.get('/addPost', ensureAuthenticated, async (req, res) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.status(403).send('Unauthorized');
    }
    res.render('addPost', {
        isAdmin: req.session.user.isAdmin,
        loggedIn: !!req.session.user,
        translations: res.locals.translations,
        language: res.locals.language
    });
});

// Route to handle adding a new post
router.post('/admin/add-post', ensureAuthenticated, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), async (req, res) => {
    if (!req.session.user.isAdmin) {
        return res.status(403).send('Unauthorized');
    }

    const { name_en, name_ru, description_en, description_ru } = req.body;
    const newPostData = {
        name_en,
        name_ru,
        description_en,
        description_ru,
        image1: {
            data: req.files['image1'][0].buffer,
            contentType: req.files['image1'][0].mimetype
        },
        image2: {
            data: req.files['image2'][0].buffer,
            contentType: req.files['image2'][0].mimetype
        },
        image3: {
            data: req.files['image3'][0].buffer,
            contentType: req.files['image3'][0].mimetype
        }
    };
    try {
        const newPost = new BlogPost(newPostData);
        await newPost.save();
        res.redirect('/blog');
    } catch (error) {
        console.error('Error saving the post:', error);
        res.status(500).send('Error saving the post');
    }
});

// Route to serve images from the database
router.get('/images/:postId/:imageField', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.postId);
        if (!post || !post[req.params.imageField].data) {
            return res.status(404).send('Not found');
        }
        const img = post[req.params.imageField];
        res.contentType(img.contentType);
        res.send(img.data);
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(404).send('Not found');
    }
});
    
// Route to handle deleting a post
router.post('/admin/delete-post/:postId', ensureAuthenticated, async (req, res) => {
    if (!req.session.user.isAdmin) {
        return res.status(403).send('Unauthorized');
    }
    try {
        await BlogPost.findByIdAndDelete(req.params.postId);
        res.redirect('/blog');
    } catch (error) {
        console.error('Error deleting the post:', error);
        res.status(500).send('Error deleting the post');
    }
});

module.exports = router;