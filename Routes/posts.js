const router = require('express').Router()
const Post = require('../models/Posts')
const User = require('../models/User')

//create a post
router.post('/create', async(req, res)=>{
    try{
        const post = await Post.create(req.body)
        res.status(200).json(post)
    }catch(error){
        res.status(500).json(error)
    }
})


//update a post
router.put('/:id', async(req, res)=>{
    try{
        const post = await Post.findOne({_id:req.params.id})
        if(post.userId === req.body.userId){
            const post = await Post.findOneAndUpdate({_id:req.params.id}, req.body)
            if(post){
                res.status(200).json({msg:"post has been updated"})
            } else{
                res.status(404).json({msg:"post not found"})
            }
        }else{
            res.status(403).json({msg:"you can only update your post"})
        }
    }catch(error){
        res.status(500).json(error)
    }
})


//get all posts
router.get('/all', async(req, res)=>{
    try{
        const posts = await Post.find({})
        if(posts){
            res.status(200).json(posts)
        } else{
            res.status(404).json({msg:"no post found"})
        }
    }catch(error){
        res.status(500).json(error)
    }
})

//get all user's post
router.get('/profile/:userId', async(req, res)=>{
    try{
        const userPosts = await Post.find({userId:req.params.userId})
        res.status(200).json(userPosts)
    }catch(error){
        res.status(500).json(error)
    }
})

//delete a post
router.delete('/:id', async(req, res)=>{
    try{
        const post = await Post.findOne({_id:req.params.id})
        if(!post){
            res.status(404).json({msg:"post not found"})
        }
        if(post.userId === req.body.userId){
            const post = await Post.findOneAndDelete({_id:req.params.id})
            if(post){
                res.status(200).json({msg:"post has been deleted"})
            }
        }else{
            res.status(403).json({msg:"you can only delete your post"})
        }
    }catch(error){
        res.status(500).json(error)
    }
})

//get a post
router.get("/:id", async(req, res)=>{
    try{
        const post = await Post.findOne({_id:req.params.id})
        if(post){
            res.status(200).json(post)
        }
    }catch(error){
        res.status(500).json(error)
    }
})


//like or dislike a post
router.put('/:id/like', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("the post has been liked")
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("the post has been disliked")
        }
    }catch(error){
        res.status(500).json(error)
    }
})

// Timeline
/*
router.get("/timeline/:userId", async(req, res)=>{
    try{
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId:currentUser._id})
        const friendsPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId:friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendsPosts))
    }catch(error){
        res.status(500).json(error)
    }
   
})
*/

module.exports = router