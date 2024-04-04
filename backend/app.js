const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./db/connect.js")

const app = express();
app.use(cors())
app.use(express.json());


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));


const port = process.env.PORT;

app.listen(port, () => {
    connectDB()
    console.log("Server is running on port",port);
  });
