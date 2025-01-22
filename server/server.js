const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

//enable cors for react 

app.use(cors({origin: "http://localhost:5173"}));

//middlewar for passing json

app.use(express.json());

//Routes
app.use("api/auth", authRoutes)

//start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
  console.log(`server is running on ${PORT}`);
})