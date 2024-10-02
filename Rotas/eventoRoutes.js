import { Router } from 'express';
import EventoController from '../Controle/eventoCtrl.js';
import { verificarAutenticacao } from '../Seguranca/autenticar.js';  // Importa a função verificarAutenticacao corretamente

const router = Router();

// Rotas protegidas pelo middleware de autenticação
router.post('/', verificarAutenticacao, EventoController.criarEvento); // Criar evento com ingressos associados
router.get('/', verificarAutenticacao, EventoController.listarEventos);  // Listar todos os eventos
router.get('/:id', verificarAutenticacao, EventoController.buscarEventoPorId);  // Buscar um evento por ID
router.put('/:id', verificarAutenticacao, EventoController.atualizarEvento);  // Atualizar um evento existente
router.delete('/:id', verificarAutenticacao, EventoController.excluirEvento);  // Excluir um evento
router.get('/:id/ingressos', verificarAutenticacao, EventoController.buscarEventoComIngressos);  // Buscar evento com ingressos

export default router;
