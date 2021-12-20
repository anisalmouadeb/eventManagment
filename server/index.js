import express, { application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import eventRoutes from "./routes/events.js";
import path from "path"
import dotenv from "dotenv";
const app = express();
// Setting up config file 
dotenv.config()
// image limits
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//add prefix /events to all the routes
app.use("/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING")
})
//image 
const __dirname = path.resolve();
console.log(__dirname)
app.use(express.static(path.join(__dirname, "/public/images")));

// setting up cloudinary server
cloudinary.config({ 
  cloud_name :process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret:process.env.API_SECRET
  })


const PORT = process.env.PORT || 5000;
// setting up database 
mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));