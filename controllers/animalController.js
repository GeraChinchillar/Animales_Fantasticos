var Animal = require('../models/animal');
var debug = require('debug')('blog:user_controller');

//---------------------- Encontrar uno -----------------------------------//
module.exports.getOne = (req, res, next) => {
    debug("Search User", req.params);
    Animal.findOne({
            nombre: req.params.name
        })
        .then((foundAnimal) => {
            if (foundAnimal)
                return res.status(200).json(foundAnimal);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

//---------------------- Encontrar Todos -----------------------------------//


module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Animal List",{size:perPage,page, sortby:sortProperty,sort});

    Animal.find()
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((foundAnimal) => {
           return res.status(200).json(foundAnimal)
        }).catch(err => {
            next(err);
        })
}

//---------------------- Crear -----------------------------------//

module.exports.register = (req, res, next) => {
    debug("New Animal", {
        body: req.body
    });
    Animal.findOne({
            nombre: req.body.nombre
        })
        .then((foundAnimal) => {
            if (foundAnimal) {
                debug("Animal duplicado");
                throw new Error(`Animal duplicado ${req.body.nombre}`);
            } else {
                let newAnimal = new Animal({
                    nombre: req.body.nombre,
                    clasificacion: req.body.clasificacion,
                    apariencia: req.body.apariencia,
                    poderEspecial: req.body.poderEspecial,
                    ubicacion: req.body.ubicacion,
                });
                
                return newAnimal.save(); // Retornamos la promesa para poder concater una sola linea de then
            }
        }).then(animal => { // Con el usario almacenado retornamos que ha sido creado con exito
            return res
                .header('Location', '/animals/' + animal._id)
                .status(201)
                .json({
                    nombre: animal.nombre
                });
        }).catch(err => {
            next(err);
        });
}

//---------------------- Update -----------------------------------//


module.exports.update = (req, res, next) => {
    debug("Update Animal", {
        nombre: req.params.name,
        ...req.body
    });

    let update = {
        ...req.body
    };  

    Animal.findOneAndUpdate({
            nombre: req.params.name
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

//---------------------- Delete -----------------------------------//

module.exports.delete = (req, res, next) => {

    debug("Delete Animal", {
        nombre: req.params.name,
    });

    Animal.findOneAndDelete({nombre: req.params.name})
    .then((data) =>{
        if (data){
            res.status(200).json(data);
        } 
        else res.status(404).send("error");
    }).catch( err => {
        next(err);
    })
}