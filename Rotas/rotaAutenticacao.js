import { Router } from 'express';
import { login, logout } from '../Seguranca/autenticar.js';  // Importa login e logout como funções nomeadas

const rotaAutenticacao = Router();

rotaAutenticacao.post('/login', login);  // Rota de login
rotaAutenticacao.get('/logout', logout);  // Rota de logout

export default rotaAutenticacao;
