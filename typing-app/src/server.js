import express from "express"
import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors"

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(__dirname)

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL if different
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

const mongoURI = "mongodb+srv://sasankhvarma2003:za4T8un7Feu043XP@cluster0.wqosx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToDatabase = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(mongoURI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
connectToDatabase();

const UserDetailCollection = mongoose.connection.collection("userdetails");

app.post("/login/signup", (req, res) =>
{
  const userData = req.body;
  UserDetailCollection.insertOne(userData);
  res.json({success: true, msg: "Account Created"});
})

app.post("/login/signin", async (req, res) =>
{
  const userData = req.body;
  const user = await UserDetailCollection.findOne(userData);
  if(user)
  {
    res.json({success: true, msg: "Successfully Logged In"});
  }
  else
  {
    res.json({success: false, msg: "Check UserName and Password"});
  }
})

app.listen(5000, () => {console.log("listeneing at port 5000")});