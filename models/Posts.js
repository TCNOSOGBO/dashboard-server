const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId: {
        type:String,
        rquired:true
    },
    title:{
        type:String,
        default:"",
        max:1000,
    },
    content:{
        type:String,
        default:"",
        max:1000,
    },
    image:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    }
}, {timestamps:true})

module.exports = mongoose.model("Post", PostSchema)