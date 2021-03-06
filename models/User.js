const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    lastName:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    username:{
        type:String,
        required:true,
        min:3,
        max:20, 
        unique:true
    },
    email:{
        type:String,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    bio:{
        type:String,
        max:50,
    },
    department:{
        type:String,
        max:50
    },
    office:{
        type:String,
        max:50
    }
    /*
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    city:{
        type:String,
        max:50,
        default:""
    },
    from:{
        type:String,
        max:50,
        default:""
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }*/
}, {timestamps:true})

module.exports = mongoose.model("User", UserSchema) 