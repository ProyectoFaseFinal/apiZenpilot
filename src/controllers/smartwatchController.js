const pool = require('../config/config.js');

//controlador para obtener toda la información médica
module.exports.getSmartwatch = async (req, res) => {
    try {
        //consulta a la base de datos para obtener toda la información médica
        const query = 'SELECT * FROM smartwatch';
        const result = await pool.query(query);
        //enviar la respuesta al cliente
        if (result.rows.length > 0) {
            console.log('Smartwatch obtenida correctamente', result.rows);
            return res.status(200).json(result.rows);
        } else {
            console.log('No se encontró información de la Smartwatch', result.rows);
            return res.status(404).json({ message: 'No se encontró información de la Smartwatch' });
        }
    } catch (error) {
        console.error('Error al obtener la información de la Smartwatch: ', error);
        return res.status(500).json({ message: 'Error con la base de datos' });
    }
}

//controlador para crear información medica
module.exports.postSmartwatch = async (req, res) => {
    try {
        //Obtener el cuerpo de la petición
        const {idUser, frecuencia_cardiaca, velocidad_promedio} = req.body;
        //VALIDAD BODY
        if (!idUser || !frecuencia_cardiaca || !velocidad_promedio) {
            console.log('Faltan campos obligatorios en el cuerpo de la petición', req.body);
            return res.status(400).json({ message: 'Faltan campos obligatorios en el cuerpo de la petición' });
        }
        //consulta SQL
        const query = 'INSERT INTO smartwatch (idUser, frecuencia_cardiaca, velocidad_promedio) VALUES ($1, $2, $3)';
        const values = [idUser, frecuencia_cardiaca, velocidad_promedio];
        const result = await pool.query(query, values);
        //enviar la respuesta al cliente
        if (result.rowCount > 0) {
            console.log('Smartwatch creada correctamente', result.rows);
            return res.status(201).json({ message: 'Smartwatch creada correctamente' });
        } else {
            console.log('No se pudo crear la información médica', result.rows);
            return res.status(400).json({ message: 'No se pudo crear la información médica' });
        }
    } catch (error) {
        console.error('Error al crear la Smartwatch: ', error);
        return res.status(500).json({ message: 'Error con la base de datos' });
    }
}

//controlador para actualizar la Smartwatch
module.exports.updateSmartwatch = async (req, res) => {
    try {
        const { frecuencia_cardiaca, velocidad_promedio } = req.body;
        const id = req.params.id;
        //consulta SQL para actualizar la Smartwatch
        const query = 'UPDATE smartwatch SET frecuencia_cardiaca = $1, velocidad_promedio = $2 WHERE id = $3';
        const values = [frecuencia_cardiaca, velocidad_promedio, id];
        const result = await pool.query(query, values);
        if (result.rowCount > 0) {
            console.log('Smartwatch actualizada correctamente', result.rows);
            return res.status(200).json({ message: 'Smartwatch actualizada correctamente' });
        } else {
            console.log('No se encontró la información médica', result.rows);
            return res.status(404).json({ message: 'No se encontró la información médica' });
        }
    } catch (error) {
        console.error('Error al actualizar la Smartwatch: ', error);
        return res.status(500).json({ message: 'Error con la base de datos' });
    }
}

//controlador para eliminar la Smartwatch
module.exports.deleteSmartwatch = async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'DELETE FROM smartwatch WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rowCount > 0) {
            console.log('Smartwatch eliminada correctamente', result.rows);
            return res.status(200).json({ message: 'Smartwatch eliminada correctamente' });
        } else {
            console.log('No se encontró la información de la Smartwatch', result.rows);
            return res.status(404).json({ message: 'No se encontró la información de la Smartwatch' });
        }
    } catch (error) {
        console.log('Error al tratar de eliminar la información de la Smartwatch: ', error);
        return res.status(500).json({ message: 'Error con la base de datos' });
    }
}