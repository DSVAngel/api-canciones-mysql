require('dotenv').config();
const Sequelize = require('sequelize');


const mysqlConnection = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true
        }
    }
);


const testMySQLConnection = async () => {
    try {
        await mysqlConnection.authenticate();
        console.log('Conexión con MySQL establecida correctamente.');
        return true;
    } catch (error) {
        console.error('Error al conectar con MySQL:', error);
        return false;
    }
};

module.exports = {
    mysqlConnection,
    testMySQLConnection,
};