const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const router = require('./app/routes/construcciones')

// Inicialización de Express 
let app = express()

//Configuración del Puerto
app.set("port", process.env.PORT || 5000)

//Middlewares
app.use(express.json())

//Rutas
app.use("/api", router)

// Servidor en Escucha
app.listen(app.get("port"), () =>
  console.log(`Run server in http://localhost:${app.get("port")}`))
