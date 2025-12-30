const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./configure/db");

const authRoutes = require("./routes/Auth");
const taskRoutes = require("./routes/task");
const testRoutes = require("./routes/tests");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB().catch(err => {
    console.error("Mongo connection error:", err);
    process.exit(1);
});

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
