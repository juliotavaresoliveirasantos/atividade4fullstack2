import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EventoIngresso = sequelize.define('EventoIngresso', {
    eventoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Eventos',  // Nome da tabela de Eventos
            key: 'id'
        }
    },
    ingressoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Ingressos',  // Nome da tabela de Ingressos
            key: 'id'
        }
    }
}, {
    timestamps: false  // Se não quiser campos createdAt e updatedAt
});

export default EventoIngresso;