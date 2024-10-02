import jwt from 'jsonwebtoken';

export function assinar(usuario) {
    return jwt.sign(usuario, process.env.CHAVE_SECRETA, { expiresIn: '1800s' });
}

export function verificarAssinatura(token) {
    try {
        return jwt.verify(token, process.env.CHAVE_SECRETA);
    } catch (error) {
        return null; // Retorna null se o token for inválido ou expirado
    }
}
