import { assinar, verificarAssinatura } from './funcoesJWT.js';

export function login(req, resp) {  // Exporta a função login
    const { usuario, senha } = req.body;

    if (usuario === 'admin' && senha === 'admin') {
        req.session.usuario = usuario;
        resp.status(200).json({
            status: true,
            mensagem: 'Login efetuado com sucesso!',
            token: assinar({ usuario })
        });
    } else {
        resp.status(401).json({
            status: false,
            mensagem: 'Falha no login!'
        });
    }
}

export function logout(req, resp) {  // Exporta a função logout
    req.session.destroy(() => {
        resp.status(200).json({
            status: true,
            mensagem: 'Logout efetuado com sucesso!'
        });
    });
}

export function verificarAutenticacao(req, resp, next) {  // Exporta a função verificarAutenticacao
    const authHeader = req.headers['authorization']; // Verifica o cabeçalho de autorização
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extrai o token "Bearer"
        try {
            const tokenVerificado = verificarAssinatura(token);  // Verifica o token JWT
            if (tokenVerificado) {
                req.user = tokenVerificado;  // Armazena o usuário verificado na requisição
                next();  // Token válido, prossegue
            } else {
                resp.status(403).json({
                    status: false,
                    mensagem: 'Usuário não autenticado!',
                });
            }
        } catch (error) {
            resp.status(403).json({
                status: false,
                mensagem: 'Token inválido ou expirado!',
            });
        }
    } else {
        resp.status(401).json({
            status: false,
            mensagem: 'Token ausente!',
        });
    }
}
