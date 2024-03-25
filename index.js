const express = require("express");
const { connection } = require("./db");
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send({
    message: "api is working now",
  });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }

  console.log("Server si running on port number", port);
});
