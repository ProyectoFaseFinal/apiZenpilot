const pool = require('../config/config');

//controlador para obtener todos los usuario
module.exports.getAllUsers = async (req, res) => {
    try {
        //consulta de SQL para hacer get
        const query = 'SELECT * FROM users';
        const result = await pool.query(query);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
        res.status(200).json({message: 'Usuario obtenido con exito', data: result.rows});
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuario' });
    }
}
//Controlado para obtener usuarios por id
module.exports.getAllIdUsers = async (req, res) => {
    try {
        //obtenemos el id de la petición que vamos a obtener
        const {id} = req.params;
        //consulta SQL para obtener el usuario por id
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario obtenido con exito', data: result.rows[0] });
    } catch (error) {
        console.log('Error al obtener el usuario por id: ', error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
}

//controlador para crear un nuevo usuario
module.exports.createUsers = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'email no introducido' });
        }

        if (!password) {
            return res.status(400).json({ message: 'password no introducido' });
        }

        // Verificar si ya existe
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'El gmail ya existe' });
        }

        // Insertar y devolver el usuario creado
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, password]
        );

        return res.status(201).json({
            message: 'Usuario creado con éxito',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('🔥 Error real:', error);
        return res.status(500).json({
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};

//controlador para actualizar un usuario por id
module.exports.actualizarUsers = async (req, res) => {
    try {
        //obtengo el cuerpo de la solicitud
        const { email, password } = req.body;
        //obtengo el id de la solicitud a mo dificar
        const id = req.params.id;
        //valido si los datos del body este completo
        if (!email || !password) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }
        //consulta SQL para poder actualizar
        const query = 'UPDATE users SET email = $1, password =$2 WHERE id = $3';
        const valuues = [email, password, id];
        pool.query(query, valuues, (err, result) => {
            if (err) {
                res.status(500).json({ message: 'Error al actualizar el usuario' });
            }
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json({ message:'Usuario actualizado con exito' });
        })
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
}

//controlador para poder eliminar un usuario por id
module.exports.deleteUsers = async (req, res) => {
    try {
        //obtener el id del usuario a eñiminar
        const id = req.params.id;
        //consulta SQL para eliminar  un usuario por id
        const query = 'DELETE FROM users WHERE id = $1';
        const values = [id];
        pool.query(query, values, (err, result) => {
            if (err) {
                console.log('Error al eliminar el usuario:', err);
                res.status(500).json({ message: 'Error al eliminar el usuario' });
            }
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario eliminado con exito' });
        })
    } catch (error) {
        console.log('Error al tratar de eliminar al usuario', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
}