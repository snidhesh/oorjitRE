import  express  from "express";
const app = express();
import dotenv from 'dotenv';
import mongoose  from "mongoose";
import userRouter from './routes/user.route.js';

//mongoose.connect(process.env.MONGO);
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
  }) 
  .catch((err) => {
    console.log(err);
  });

app.listen(3002, () => {
    console.log('Server running on port 3002');
}

);
app.use('/api/user', userRouter);
