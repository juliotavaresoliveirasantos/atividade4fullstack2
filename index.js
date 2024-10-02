import express from 'express';
import session from 'express-session';
import cors from 'cors'; // Importação do CORS
import sequelize from './config/database.js'; // Correção da ordem das importações
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import eventoRoutes from './Rotas/eventoRoutes.js';
import ingressoRoutes from './Rotas/ingressoRoutes.js';
import './models/associations.js';
import dotenv from 'dotenv';
import { verificarAutenticacao } from './Seguranca/autenticar.js';


dotenv.config();

const app = express();
const host = 'localhost';
const porta = 4000;

// Habilitar CORS para todas as rotas
app.use(cors({
    origin: 'http://localhost:3000', // Permitir apenas o front-end em localhost:3000
    credentials: true // Permitir o uso de credenciais (sessões e cookies)
}));

app.use(session({
    secret: process.env.CHAVE_SECRETA || 'fallback_secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30, // 30 minutos de sessão
    }
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rotas
app.use("/autenticacao", rotaAutenticacao); // Rota de login/logout não precisa de autenticação
app.use("/eventos", verificarAutenticacao, eventoRoutes); // Rotas de eventos protegidas por autenticação
app.use("/ingressos", verificarAutenticacao, ingressoRoutes); // Rotas de ingressos protegidas por autenticação

// Inicialização do servidor
app.listen(porta, host, async () => {
    try {
        await sequelize.sync({ alter: true }); // Sincronização com o banco de dados
        console.log(`Servidor rodando em http://localhost:${porta}`);
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
});
