const express = require('express');
const app = express();
const router = express.Router();
const Post = require('../models/POST.js');

// create routes

// simple route
router.get('/specific', (req, res)=>{
    res.send('Welcom to Specific Post');
})

// get all posts 
router.get('/', async(req, res)=>{
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(e){
        console.log(e);
    }
    // res.send('Welcom to Posts Page');
})

// find specific post 
router.get('/:postId', async(req, res)=>{
    try{
        const post = await Post.find({title: req.params.postId});
        res.json(post);
    } catch(e){
        console.log(e);
    }
})



// post a request 
router.post('/', async(req, res)=>{
    var post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savePost = await post.save();
        await res.json(savePost);
    } catch(e){
        res.json({errorMsg: e})
    }
    // res.send("Data posted successfully.");
})

// delete specific post 
router.delete('/:postId', async(req, res)=>{
    try{
        const params = req.params.postId;
        const delPost = await Post.deleteOne({_id: params});
        console.log(`Record ${req.body} deleted successfully.`);
        res.json(delPost);
    } catch(e){
        console.log(e);
    }
})

// update specific post 
router.patch('/:postId', async(req, res)=>{
    try{
        const updatePost = await Post.updateOne({
            _id: req.params.postId
        }, {
            $set: {title: req.body.title}
        });
    console.log(`Record ${req.body.title} updated successfully.`);
    res.json(updatePost);
} catch(e){
    console.log(e);
}
})

module.exports = router;