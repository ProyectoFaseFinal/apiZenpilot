const {DB_USER, DB_DATABASE, DB_PASSWORD, DB_HOST, DB_PORT } =  require('dotenv').config();
const { Pool } = require('pg');

//Hacemos la conexion de la base de datos a Pool
const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    
    //configuracion recomendable para evitar problemas de rendimiento y estabilidad
    max: 20
});

//verificamos errores de pool que puedan surgir
pool.on('error', (err, client) => {
    console.error('Error en el pool de conexiones:', err);
})

module.exports = pool;