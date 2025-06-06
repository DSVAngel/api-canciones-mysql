const { DataTypes } = require('sequelize');

const defineCancionModel = (sequelize) => {
    return sequelize.define('Cancion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artistas: {
            type: DataTypes.TEXT, // Almacenamos los artistas como JSON stringificado
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('artistas');
                return rawValue ? JSON.parse(rawValue) : [];
            },
            set(value) {
                this.setDataValue('artistas', JSON.stringify(value));
            }
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        album: {
            type: DataTypes.STRING,
            allowNull: true
        },
        caratula: {
            type: DataTypes.STRING, 
            allowNull: true
        }
    }, {
        tableName: 'canciones',
        timestamps: true
    });
};

module.exports = defineCancionModel;