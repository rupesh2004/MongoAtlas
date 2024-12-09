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
app.post('/signup',async(req,res)=>{
  const {name,email,password} = req.body;
  if(!name || !email || !password){
    return res.status(400).json({message: "Invalid username or password"})
  }
  try {
    const newUser = User({
      name,email,password
    })
    await newUser.save()
    return res.status(201).json({message: "User saved successfully"})
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

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

// Start the Server
app.listen(port, () => {
  console.log("Listening on port", port);
});
