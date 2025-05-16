const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.URI);
        console.log('Conectado a mongo');
    } catch (error) {
        console.log({'Error en la conexion': error});
    }
}

module.exports = connectDB;