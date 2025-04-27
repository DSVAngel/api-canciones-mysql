require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { mysqlConnection} = require('./config/db');
const defineCancionModel = require('./models/models');
const createCancionController = require('./controllers/controller');
const { configurarRutas } = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const CancionMySQL = defineCancionModel(mysqlConnection);

const mysqlController = createCancionController(CancionMySQL);

const mysqlRouter = express.Router();

configurarRutas(mysqlRouter, mysqlController, 'mysql');

app.use('/api/mysql/canciones', mysqlRouter);

app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API funcionando correctamente' });
});

app.use(express.static(path.join(__dirname, 'public')));
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'Error interno del servidor' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});


module.exports = app;