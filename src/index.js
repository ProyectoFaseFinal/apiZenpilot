const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/usuarios', require('./routes/usersRouter.js'));
app.use('/api/about', require('./routes/aboutRouter.js'));
app.use('/api/medical_information', require('./routes/medical_informationRouter.js'));
app.use('/api/smartwatch', require('./routes/smartWatchRouter.js'));

//puertos en escucha
const PORT = process.env.PORT || 3002;
app.listen(PORT,() => {
    console.log(`Servidor en escucha en el puerto ${PORT}`);
})