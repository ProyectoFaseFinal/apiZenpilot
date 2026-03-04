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