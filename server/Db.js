import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const uri=process.env.DB_URL;

const connectionParams={ 
   useNewUrlParser: true, 
   useUnifiedTopology: true
} 

const ConnectToMongoose=async()=>{
   try {
    const conn= await mongoose.connect(uri,connectionParams);
   if(conn){
    console.log('connection successfully')
   }
   } catch (error) {
    console.log("error in db connection")
   }
}

export default ConnectToMongoose;