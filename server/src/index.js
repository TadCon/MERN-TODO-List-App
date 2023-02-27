//Inicializar Express
const express = require("express");
const app = express();

//Inicializar dotenv
const dotenv = require("dotenv");
dotenv.config();

//Inicializar cors
const cors = require("cors");

//Inicializar morgan
const morgan = require("morgan");

const mongoose = require("mongoose");

const router = require("./router");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(router);

//Previene el DeprecationWarning del strictQuery de Mongoose
mongoose.set('strictQuery', false); 

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(8080);
    console.log('Running on port 8080');
});
