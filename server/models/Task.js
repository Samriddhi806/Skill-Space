const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  assignedToUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "in_progress", "done"], default: "pending" }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
