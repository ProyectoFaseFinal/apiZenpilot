const {DB_USER, DB_DATABASE, DB_PASSWORD, DB_HOST, DB_PORT } =  require('dotenv').config();
const { rejects } = require('assert');
const { Pool } = require('pg');

//Hacemos la conexion de la base de datos a Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    SSL: {
        rejectsUnauthorized: false
    },
    //configuracion recomendable para evitar problemas de rendimiento y estabilidad
    max: 5
});

//verificamos errores de pool que puedan surgir
pool.on('error', (err, client) => {
    console.error('Error en el pool de conexiones:', err);
})

module.exports = pool;