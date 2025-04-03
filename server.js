require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.error("MongoDB connection failed ❌", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create User Model
const User = mongoose.model("User", userSchema);

// Home route showing database connection status
app.get("/", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ database_status: dbStatus });
});

// Test route to check if the server is running
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Create (POST) - Add a new user
app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password are required" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User added", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Read (GET) - Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Update (PUT) - Update a user by ID
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { username, password }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// Delete (DELETE) - Remove a user by ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
