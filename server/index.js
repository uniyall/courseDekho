require("dotenv").config();
const express = require("express");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`All okay 🚀`);
});

app.use("/admin", adminRouter);

app.use("/user", userRouter);

app.listen(6060, () => {
  console.log("Server Listening...");
});
