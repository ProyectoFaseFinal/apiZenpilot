const pool = require('../config/config.js');

//controlador para obtener toda la información médica
module.exports.getAllMedicalInformation = async (req, res) => {
    //consulta a la base de datos para obtener toda la información médica
    const query = 'SELECT * FROM medical_information';
    const result = await pool.query(query);
    //enviar la respuesta al cliente
    if (result.rows.length > 0) {
        console.log('Información médica obtenida correctamente', result.rows);
        return res.status(200).json(result.rows);
    } else {
        console.log('No se encontró información médica', result.rows);
        return res.status(404).json({ message: 'No se encontró información médica' });
    }
}

//controlador para crear información medica
module.exports.postMedicalInformation = async (req, res) => {
    try {
        //Obtener el cuerpo de la petición
        const {idUser, doctor_nombre, medicina, altura, peso} = req.body;
        //consulta SQL
        const query = 'INSERT INTO medical_information (idUser, doctor_nombre, medicina, altura, peso) VALUES ($1, $2, $3, $4, $5)';
        const values = [idUser, doctor_nombre, medicina, altura, peso];
        const result = await pool.query(query, values);
        //enviar la respuesta al cliente
        if (result.rows.length > 0) {
            console.log('información medica creada correctamente', result.rows);
            return res.status(201).json({ message: 'Información médica creada correctamente' });
        } else {
            console.log('No se pudo crear la información médica', result.rows);
            return res.status(400).json({ message: 'No se pudo crear la información médica' });
        }
    } catch (error) {
        console.error('Error al crear lainformación médica: ', error);
        return res.status(500).json({ message: 'Error con la base de datos' });
    }
}

//controlador para actualizar la información médica
module.exports.updateMedicalInformation = async (req, res) => {
    try {
        const { doctor_nombre, medicina, altura, peso } = req.body;
        const id = req.params.id;
        //consulta SQL para actualizar la información médica
        const query = 'UPDATE medical_information SET doctor_nombre = $2, medicina = $3, altura = $4, peso = $5 WHERE id = $6';
        const values = [doctor_nombre, medicina, altura, peso, id];
        const result = await pool.query(query, values);
        if (result.rowCount > 0) {
            console.log('Información médica actualizada correctamente', result.rows);
            return res.status(200).json({ message: 'Información médica actualizada correctamente' });
        } else {
            console.log('No se encontró la información médica', result.rows);
            return res.status(404).json({ message: 'No se encontró la información médica' });
        }
    } catch (error) {
        console.error('Error al actualizar la información médica: ', error);
        return res.status(500).json({ message: 'Error con la base de datos' });
    }
}

//controlador para eliminar la información médica
module.exports.deleteMedicalInformation = async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'DELETE FROM medical_information WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rowCount > 0) {
            console.log('Información médica eliminada correctamente', result.rows);
            return res.status(200).json({ message: 'Información médica eliminada correctamente' });
        } else {
            console.log('No se encontró la información médica', result.rows);
            return res.status(404).json({ message: 'No se encontró la información médica' });
        }
    } catch (error) {
        console.log('Error al tratar de eliminar la información médica: ', error);
        return res.status(500).json({ message: 'Error con la base de datos' });
    }
}