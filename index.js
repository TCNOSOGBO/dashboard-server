const express = require('express')
const app = express()
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./db/connect')
const userRoutes = require('./Routes/users')
const authRoutes = require('./Routes/auth')
const postRoutes = require('./Routes/posts')

dotenv.config()

const PORT = process.env.PORT || 8800

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())


app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)


const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log('Server is listening on port 8800...'))
    }catch (error){
        console.log(error)
    }
 }

 start()