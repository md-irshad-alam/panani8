import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connection from "./Controller/DBConnect/dbConnections.js";
import bodyParser from "body-parser";
import postRouter from "./Routes/routes.js";
const app = express();
let PORT = process.env.PORT;
import cors from "cors";
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  try {
    console.log("=== Request Logger ===");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl); // full path including query
    console.log("Params:", req.params); // URL params like /user/:id
    console.log("Query:", req.query); // Query strings like ?search=abc
    console.log("======================");
  } catch (error) {
    console.error("Logger error:", error);
  }
  next(); // don't forget this
});

app.use("/api", postRouter);

app.listen(PORT, (req, res) => {
  connection();
  console.log("server is runing on the port ", PORT);
});
