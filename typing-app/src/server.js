import express from "express"
import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootdir = path.join(__dirname, "..");

console.log(__rootdir);

const app = express();

app.use(express.json());

app.use(express.static(path.join(__rootdir, 'dist')));

// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization'
// }));

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
const UserDetailsCollection = mongoose.connection.collection("userdetails");

app.post("/login/signup", (req, res) =>
{
  const userData = req.body;
  userData["tests"] = 0;
  userData["wpm"] = 0.0;
  UserDetailsCollection.insertOne(userData);
  res.json({success: true, msg: "Account Created"});
})

app.post("/login/signin", async (req, res) =>
{
  const userData = req.body;
  const user = await UserDetailsCollection.findOne(userData);
  if(user)
  {
    res.json({success: true, msg: "Successfully Logged In"});
  }
  else
  {
    res.json({success: false, msg: "Check UserName and Password"});
  }
})

app.get("/account/userdetails/:uname", async (req, res) =>
{
  const uname = req.params.uname;
  const userDetails = await UserDetailsCollection.findOne({username: uname});
  delete userDetails.password;
  delete userDetails._id;
  res.json(userDetails);
})

app.put("/account/userdetails/:uname", async (req, res) =>
{
  const uname = req.params.uname;
  const newUserData = req.body;
  const result = await UserDetailsCollection.updateOne({username: uname}, {$set : newUserData});
  if(result)
  {
    res.json({success: true, msg: "succesfully updated"});
  }
  else
  {
    res.json({success: false, msg: "cannot update"});
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__rootdir, 'dist', 'index.html'));
});

app.listen(5000, () => {console.log("listeneing at port 5000")});