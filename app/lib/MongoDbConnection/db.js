import mongoose from 'mongoose'

/*const connectDB = async()=>{
  try{
    await mongoose.connect(`mongodb+srv://pro:${process.env.MongoPwd}@mycluster.pbbtvdv.mongodb.net/MyForeclosure`);
    console.log("mongo db connection successful")
  }
  catch (error){
    throw new Error("Error in coneecting to mongodb.")
  }
}*/

const connectDB = async()=>{
  try{
    await mongoose.connect("mongodb://localhost:27017/MyForeclosure");
    console.log("mongo db connection successful")
  }
  catch (error){
    throw new Error("Error in coneecting to mongodb.")
  }
}

export default connectDB;