const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./database/dataBase");
const authRouter = require("./routes/auth");
const registerRouter = require("./routes/form");

const app = express();
// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
app.use("/formauth", authRouter);
app.use("/formregister", registerRouter);
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
