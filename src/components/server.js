import express from "express";
import mongoose from "mongoose";
import User from "./userSchema.js";
import cors from "cors"
const app = express();
const port = 6969;


app.use(cors());
app.use(express.json());
// Database Connection
const connection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://bhosalerupesh67:5AQXBYqK5w5lpVp6@users-data.ltabg.mongodb.net/users`
    );
    console.log("Database connected successfully:", mongoose.connection.name); // Correct property to access the database name
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};
connection();

// Basic Route
app.get("/", (req, res) => {
  res.send("Server is running");

});
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid name, email, or password" });
  }

  try {
    const newUser = new User({ name, email, password });
    
    await newUser.save(); // Save the new user to the database

    // Send a success response once the user is saved
    return res.status(201).json({ message: "User saved successfully" });

  } catch (err) {
    // Handle errors properly by sending only one response
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ message: "Error saving user to database" });
    }
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Both email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email" });
    }
    if (user.password === password) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/forgot-password',async(req,res)=>{
  const {email,newPassword} = req.body;

  if(!email || !newPassword){
    res.status(400).json({message : "Both email and new password is required"})
  }

  try{
    const user  = await User.findOne({email})

    if(!user){
      return res.status(404).json({message : "User not found"})
    }
    user.password=newPassword
    await user.save();

    res.status(200).json({message : "Password has been updated successfully"})
  }catch(err){
    res.status(500).json({message : "An error occured while resetting the passsword"})
  }
})

app.get('/user/:email',async(req,res)=>{
  const email = req.params.email;
  try {
    const user = await User.findOne({email})
    if(!user){
      res.status(404).json({message : "User not found"})
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({message : err.message})
  }
})

app.delete('/user/:email',async(req,res) => {
  const email = req.params.email;
  try {
    const user = await User.findOneAndDelete({email})
    if(!user){
      res.status(404).json({message:"User not found"})
    }
    res.json({message:"User deleted successfully"})
  } catch (err) {
    res.status(500).json({message : err.message})
  }
})
// Start the Server
app.listen(port, () => {
  console.log("Listening on port", port);
});
