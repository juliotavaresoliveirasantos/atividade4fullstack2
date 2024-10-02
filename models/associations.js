import Evento from './Evento.js';
import Ingresso from './Ingresso.js';
import EventoIngresso from './EventoIngresso.js';

// Relacionamento N:N entre Evento e Ingresso utilizando a tabela intermediária 'EventoIngresso'
// Definimos alias únicos para cada associação

// Evento possui muitos ingressos
Evento.belongsToMany(Ingresso, { through: EventoIngresso, as: 'ingressos', foreignKey: 'eventoId' });
// Ingresso está associado a muitos eventos
Ingresso.belongsToMany(Evento, { through: EventoIngresso, as: 'eventos', foreignKey: 'ingressoId' });

export { Evento, Ingresso, EventoIngresso };