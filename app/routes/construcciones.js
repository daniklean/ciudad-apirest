let express = require('express')
let router = express.Router()
let {
    listarConstrucciones, 
    agregarConstrucciones, 
    actualizarConstrucciones, 
    borrarConstrucciones,
    listarConstruccion
    }= require('../controllers/construcciones')

router.get("/", listarConstrucciones) 
router.get("/:id", listarConstruccion)
router.post("/", agregarConstrucciones)
router.put("/:id", actualizarConstrucciones)
router.delete("/:id", borrarConstrucciones)

module.exports = router