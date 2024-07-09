import connectDB from "./database/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";
import http from "http";

dotenv.config({
  path: "./.env",
});
const port = process.env.PORT || 5000;
const server = http.createServer(app);
connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on the port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed!!!", error);
  });
