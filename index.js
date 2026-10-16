const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// --- In-memory data for now (swap for Supabase later) ---
let users = [];
let jobs = [
  // { id: 1, title: "Lead Actor - Skit Series", description: "Shoot in Lagos, 3-day shoot." }
];

app.get("/", (req, res) => {
  res.send("4VAGE backend is running!");
});

// SIGNUP
app.post("/api/signup", (req, res) => {
  const { email, firstName, surname } = req.body;
  if (!email || !firstName || !surname) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(400).json({ error: "Email already registered" });
  }
  const user = { id: users.length + 1, ...req.body, availability: false };
  users.push(user);
  res.status(201).json({ message: "Account created", user });
});

// SIGNIN (placeholder - swap for real auth/password hashing with Supabase)
app.post("/api/signin", (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: "No account found with that email" });
  }
  res.json({ message: "Signed in", user });
});

// PROFILE - get by email (simple placeholder lookup)
app.get("/api/profile/:email", (req, res) => {
  const user = users.find((u) => u.email === req.params.email);
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
});

// TOGGLE AVAILABILITY
app.patch("/api/profile/:email/availability", (req, res) => {
  const user = users.find((u) => u.email === req.params.email);
  if (!user) return res.status(404).json({ error: "Not found" });
  user.availability = req.body.availability;
  res.json(user);
});

// JOBS
app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

app.post("/api/jobs", (req, res) => {
  const job = { id: jobs.length + 1, ...req.body };
  jobs.push(job);
  res.status(201).json(job);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`4VAGE backend running on port ${PORT}`);
});
