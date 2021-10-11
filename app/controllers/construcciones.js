let construcciones = require("../../config/construcciones.json")
let fs = require("fs");
let crypto = require("crypto")
let path = require("path");
let filePath = path.join(__filename, '../../../config/construcciones.json')
console.log(filePath)

//Generando un ID único con Criptografía
let id = () => crypto.randomBytes(3*4).toString('hex')

// Creando construcciones, utilizando el .push() para empujar la construcción, el módulo FileSystem con el metodo fs.writeFile y el método JSON.Stringify para convertir un objeto a formato JSON y escribiendo en el archivo construcciones.json
let agregarConstrucciones = (req,res) => {
    try {
        let{tipoConstruccion,
            nombreConstruccion,
            recursosConstruccion,
            ubicacion,
            habitaciones,
            apartamentos, 
            dimensiones, 
            locales,
            atracciones} = req.body
            
        let agregarConstruccion = {
            id:id(), 
            tipoConstruccion, 
            nombreConstruccion, 
            recursosConstruccion, 
            ubicacion, 
            habitaciones,
            apartamentos, 
            dimensiones, 
            locales,
            atracciones}
        construcciones.construcciones.push(agregarConstruccion)
        fs.writeFile(filePath,JSON.stringify(construcciones,null, 2),"utf-8", (error) => {  
            if(error) {
            console.log(`Ocurrio un error al escribir el archivo ${error}`)
        } else {
            console.log("Se agrego satisfactoriament la construcción en el archivo construcciones.json")
        }
    })
        res.status(200).json({tracker: "Agregada la construccion en la ciudad", totalConstrucciones: construcciones.construcciones.length,construcciones: construcciones.construcciones})
    } catch (error) {
        res.status(500).send("Ups, algo salio mal "+ error)
    }
}

// Listando las construcciones de la Ciudad, buscando por la longitud 
let listarConstrucciones = (req,res) => {
    try {
        if(!construcciones.construcciones.length){
        res.status(404).json({tracker: 'No se ha encontrado ninguna construccion, por favor debe agregarla'})
        }else{
        res.status(200).json({tracker: 'Listado de las Construcciones de la Ciudad', totalConstrucciones: construcciones.construcciones.length, construcciones: construcciones.construcciones})
        }
    } catch (error) {
        res.status(500).send("Ups, algo salio mal "+ error)
    }
}

// Listar construcción por el ID utilizando el metodo .find() para buscar el elemento, construccion.id mostrando así la creación de la construcción 

let listarConstruccion = (req,res) => {
    try {   
        let id = req.params.id
        let construccion = 
        construcciones.construcciones.find((construccion) => 
        construccion.id === id)
        if(!construccion) {
            res.status(404).json({tracker: 'En el listado de construcciones no se encuentra esta construcción'})
        }else{
            res.status(200).json({tracker: 'Se ha ubicado la construccion solicitada',construccion:construccion})
        }
    } catch (error) {
        res.status(500).send("Ups, algo salio mal "+ error)
    }
}

// Actualizar la construcción, utilizando el método findeIndex() para buscar y retornar el indice de la construccion solicitada, requiriendo las llaves de la misma para su actualización, donde se puede agrandar o disminuir de tamaño la construcción en la ciudad, usando el fs.writeFile y el metodo JSON.stringify para escribirlo en el archivo construcciones.json

let actualizarConstrucciones = (req,res) => {
    try {
        let id = req.params.id
        let {tipoConstruccion,
            nombreConstruccion,
            recursosConstruccion,
            ubicacion,
            habitaciones,
            apartamentos, 
            dimensiones, 
            largo,
            ancho,
            locales,
            atracciones} = req.body
        let indice = construcciones.construcciones.findIndex
        (cons => cons.id === id)
        const construccion = construcciones.construcciones[indice]
        construccion.tipoConstruccion = tipoConstruccion
        construccion.nombreConstruccion = nombreConstruccion
        construccion.recursosConstruccion = recursosConstruccion
        construccion.ubicacion = ubicacion
        construccion.habitaciones = habitaciones
        construccion.apartamentos = apartamentos
        construccion.dimensiones  = dimensiones
        construccion.dimensiones[0] = largo
        construccion.dimensiones[1] = ancho
        construccion.locales = locales
        construccion.atracciones = atracciones
        construcciones.construcciones[indice] = construccion
        fs.writeFile(filePath, JSON.stringify(construcciones, null, 2), err => {
            if (err) {
                console.log(`Ocurrio un error al escribir el archivo ${error}`)
            }else{
                console.log('Se actualizó satisfactoriament la construcción en el archivo construcciones.json')
            }
        })
         res.status(200).json({tracker: 'Se ha actualizado la construcción', construcciones: construcciones.construcciones[indice]})
        } catch (error) {
            res.status(500).send("Ups, algo salio mal "+ error)     
    }
}
// Borrar construcciones, utilizando el metodo .filter() para filtrar un elemento, construccion.id utilizando un operador lógico que permite buscar entre todos los id, encuentra el id correspondiente donde destruirá la construcción, usando el fs.writeFile y JSON.stringify para escribir en el archivo construcciones.json

let borrarConstrucciones = (req,res) => {
    try {
        let id = req.params.id
        let borrarConstruccion = construcciones.construcciones.filter(construccion => construccion.id !== id)
        fs.writeFile(filePath, JSON.stringify({construcciones:borrarConstruccion}, null, 2), err =>{ 
            if(err){
                console.log(`Ocurrio un error al escribir el archivo ${error}`)
            }else{
                console.log('Se eliminó satisfactoriamente la construcción en el archivo construcciones.json')
            }
        })
        res.status(200).json({tracker: 'Se ha eliminado esta construccion de la lista'})
    } catch (error) {
        res.status(500).send('Ups, ocurrio un error' + error)
    }
}

module.exports = {
    listarConstrucciones, 
    listarConstruccion, 
    agregarConstrucciones, 
    actualizarConstrucciones,
    borrarConstrucciones} 