const express = require("express");
const Task = require("../models/Task");
const { authMiddleware } = require("./Auth");
const authenticate = require('../middleware/auth');




const router = express.Router();

// Employer creates a task for an employee
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "employer")
    return res.status(403).json({ message: "Only employers can create tasks" });

  const { title, description, assignedToUserId } = req.body;
  const task = await Task.create({ title, description, assignedToUserId });
  res.json(task);
});

// Employer sees all tasks
router.get("/", authMiddleware, async (req, res) => {
  try{
    if (req.user.role !== "employer"){
      return res.status(403).json({ message: "Only employers can view all tasks" });
    }
    const tasks = await Task.find();
    res.json(tasks);
  } catch(err){
    console.error("List tasks error:", err);
    res.status(500).json({ message: "Server error"});
  } 
});

// Employee: my tasks
router.get("/my", authMiddleware, async (req, res) => {
  if (req.user.role !== "employee")
    return res.status(403).json({ message: "Only employees can view their tasks" });

  const tasks = await Task.find({ assignedToUserId: req.user.id });
  res.json(tasks);
});

// Employee: update status
router.patch("/:id/status", authMiddleware, async (req, res) => {
  if (req.user.role !== "employee")
    return res.status(403).json({ message: "Only employees can update status" });

  const { status } = req.body; // "pending" | "in_progress" | "done"
  const task = await Task.updateStatus(parseInt(req.params.id, 10), status);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// Assign specific test to specific employee
router.post('/assign', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
  const { employee_id, test_id } = req.body;
  // Save assignment in new 'assignments' table
});

module.exports = router;
