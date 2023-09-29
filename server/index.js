import express  from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectToMongoose from './Db.js';
import authRoutes from './routes/authRoute.js'
dotenv.config() 

const app=express();
// middleware
app.use(cors())
app.use(express.json())

// Rest Api
app.use('/api/v1/auth',authRoutes)

// DB connection
ConnectToMongoose();


// App listen
app.listen(process.env.PORT|| 8000)