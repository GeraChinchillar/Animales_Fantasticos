const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnimalSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    clasificacion:{
        type: String,
        require: true
    },       
    apariencia: String,
    poderEspecial:{
        type: Boolean,
        required: true
    },
    ubicacion: String,
},{
    timestamps: true
});

module.exports = mongoose.model("Animal", AnimalSchema);