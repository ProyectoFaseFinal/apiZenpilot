const  pool = require('../config/config.js');

//controlador para obtener la información del conductor
module.exports.getAllAbout = async (req, res) => {
    try {
        //consulta SQL para obtener la información
        const query = "SELECT * FROM about";
        const result = await pool.query(query);
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontró información' });
        }
        res.status(200).json({ message: 'Información obtenida con éxito', data: result.rows });
    } catch (error) {
        console.error('Error al obtener la información:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
//controlador para guardar datos del conductor
module.exports.guardarAbout = async (req, res) => {
    try {
        const {idUsers, nombre, edad } = req.body;
        //verificar que se este toda la información
        if (!idUsers || !nombre || !edad) {
            return res.status(400).json({
                message: 'Faltan datos requeridos' 
            })
        }
        //consulta SQL para guardar la información
        const query = "INSERT INTO about (idUsers, nombre, edad) VALUES ($1, $2, $3)";
        const values = [idUsers, nombre, edad];
        pool.query(query, values, (error, results) => {
            if (error) {
                res.status(500).json({
                    message: 'Error al guardar la información', 
                    error: error.message
                })
            } else {
                res.status(201).json({
                    message: 'Información guardada con éxito'
                })
            }
        })
    } catch (error) {
        console.log('Error al guardar la información:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
//controlador para actualizar la información
module.exports.actualizarAbout = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, edad } = req.body;
        //consulta SQL para actualizar la información
        const query = "UPDATE about SET nombre = $1, edad = $2 WHERE id = $3";
        const values = [nombre, edad, id];
        if (!nombre || !edad) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Información no encontrada' });
        }
        res.status(200).json({ message: 'Información actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar la información:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
//controlador para eliminar la información
module.exports.deleteAbout = async (req, res) => {
    try {
        const {id} = req.params;
        //consulta SQL para eliminar la información
        const query= "DELETE FROM about WHERE id = $1";
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Información no encontrada' });
        }
        res.status(200).json({ message: 'Información eliminada con éxito' });
    } catch (error) {
        console.log("Error al eliminar la información: ", error);
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
}