import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Evento from './Evento.js';  // Importa o modelo de Evento para definir as associações

const Ingresso = sequelize.define('Ingresso', {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// As associações são definidas no arquivo `associations.js`, não aqui

export default Ingresso;