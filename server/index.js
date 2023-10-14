import express  from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectToMongoose from './Db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
dotenv.config() 

const app=express();
// middleware
app.use(cors())
app.use(express.json())

// Rest Api
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)
// DB connection
ConnectToMongoose();


// App listen
app.listen(process.env.PORT|| 8000)