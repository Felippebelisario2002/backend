require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(
`mongodb+srv://felippe_belisario:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
)
.then(() => console.log("MongoDB conectado com sucesso!"))
.catch((err) => console.error("Erro ao conectar ao MongoDB:", err));



module.exports = app;
