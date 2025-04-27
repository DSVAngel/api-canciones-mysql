require('dotenv').config();
const app = require('./app');
const { mysqlConnection, testMySQLConnection } = require('./config/db');

const PORT = process.env.PORT || 8080;


const startServer = async () => {
    try {
        const mysqlConnected = await testMySQLConnection();

        if (!mysqlConnected) {
            console.error('No se pudo conectar a ninguna base de datos. Verifique la configuración.');
            process.exit(1);
        }

        if (mysqlConnected) {
            await mysqlConnection.sync();
            console.log('Modelos de MySQL sincronizados correctamente');
        }
        
        app.listen(PORT, () => {
            console.log(`Servidor iniciado en el puerto ${PORT}`);
            console.log(`- API MySQL: ${mysqlConnected ? 'Disponible' : 'No disponible'}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();