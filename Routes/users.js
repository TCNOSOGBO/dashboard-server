const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

//update user

router.put("/:id", async(req, res)=>{

    if(req.body.userId = req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch(error){
                res.status(500).json({msg:error})
            }
        }
        const user = await User.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators:true})
        if(!user){
            res.status(404).json({msg:`user with id: ${req.params.id} does not exist`})
        } else{
            res.status(200).json({msg:"account has been updated", user})
        }
    }else{
        return res.status(403).json({msg:"you can only update your account"})
    }

})

//delete user

router.delete("/:id", async(req, res)=>{

    if(req.body.userId = req.params.id || req.body.isAdmin){
        const user = await User.findOneAndDelete({_id:req.params.id})
        if(!user){
            res.status(404).json({msg:`user with id: ${req.params.id} does not exist`})
        } else{
            res.status(200).json({msg:"account has been deleted", user})
        }
    }else{
        return res.status(403).json({msg:"you can only delete your account"})
    }
    
})


// get a user

router.get("/", async(req, res)=>{
    const username = req.query.username;
    const userId = req.query.userId
    try{
        const user = username? await User.findOne({username}) :await User.findOne({_id:userId})
        if(!user){
            res.status(404).json({msg:`user with id: ${req.params.id} does not exist`})
        } else{
            const {password, createdAt, updatedAt, ...other} = user._doc
            res.status(200).json(other)
        }
    }catch(error){
        res.status(500).json(error)
    }
})


// get all Users
router.get('/all', async(req, res)=>{
    try{
        const users = await User.find({})
        if(!users){
            res.status(404).json({msg:`There exist no registered user`})
        } else{
            const newUsers = users.map(user=>{
                const {password, createdAt, updatedAt, ...other} = user._doc
                return other
            })
            res.status(200).json(newUsers)
        }

    }catch(error){
        res.status(500).json(error)
    }
})


//follow a user
router.put('/:id/follow', async(req, res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findOne({_id:req.params.id})
            const currentUser = await User.findOne({_id:req.body.userId})
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers:req.body.userId}})
                await currentUser.updateOne({$push: {followings: req.params.id}})
                res.status(200).json({msg:"user has been followed"})
            }else{
                res.status(403).json({msg:"you already followed this user"})
            }

        }catch(error){
            res.status(500).json(error)
        }
    } else {
        res.status(403).json({msg:"you can't follow yourself"})
    }
})

//unfollow a user

router.put('/:id/unfollow', async(req, res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findOne({_id:req.params.id})
            const currentUser = await User.findOne({_id:req.body.userId})
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers:req.body.userId}})
                await currentUser.updateOne({$pull: {followings: req.params.id}})
                res.status(200).json({msg:"user has been unfollowed"})
            }else{
                res.status(403).json({msg:"you already unfollowed this user"})
            }

        }catch(error){
            res.status(500).json(error)
        }
    } else {
        res.status(403).json({msg:"you can't unfollow yourself"})
    }
})

module.exports =router