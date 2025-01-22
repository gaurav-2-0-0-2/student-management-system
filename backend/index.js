const express = require("express");
const db = require("./models/index")
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cors = require("cors");

const app = express();
const PORT = 3000 || 3001;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.get("/", (_, res) => {
  res.send("hello");
});

// Sync database before starting server
db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
