const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers/index")
const customErrorHandler = require("./middleware/errors/customErrorHandler")
//Environment Variables 
dotenv.config({
    path:"./config/env/config.env"
})
//localhost:5000/api/questions
//localhost:5000/api/auth
const app = express();

//Express - Body Middleware
app.use(express.json())

const PORT = process.env.PORT;

// Routers Middleware
app.use("/api", routers);

//Error Handler
app.use(customErrorHandler);

app.listen(PORT, ()=> {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`)
})