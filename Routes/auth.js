const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

//REGISTER
router.post('/register', async(req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await User.create({...req.body, password:hashedPassword})
        res.status(200).json(user)
    } catch(error){
        res.status(500).json(error)
    }
})


//LOGIN
router.post('/login', async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        !user && res.status(404).json({msg:"user not found"})

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json({msg:"wrong password"})

        res.status(200).send(user)
    }catch(error){
        res.status(500).json(error)
    }
})
module.exports = router