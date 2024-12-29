const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn.js");
const app = express();
const dotenv = require("dotenv");

const rootRouter = require("./routes/rootRouter.js");
const User = require("./routes/userRouter.js");
const WeightRouter = require("./routes/weightRouter.js");

const port = process.env.PORT || 5001;

dotenv.config();

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  const host = req.headers.host;
  if (host) {
    const subdomain = host.split(".")[0]; // Extract the subdomain
    req.subdomain = subdomain;
  } else {
    req.subdomain = null; // Handle the case where host is undefined
  }
  next();
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", rootRouter);
app.use("/api/user", User);
app.use("/api/weightData", WeightRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
