import { Container, Form, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Hook para redirecionamento
import { ContextoUsuarioLogado } from '../../App';
import { login } from '../../servicos/loginService';

export default function FormLogin() {
    const contexto = useContext(ContextoUsuarioLogado);
    const navigate = useNavigate();  // Hook para redirecionamento
    const [usuario, setUsuario] = useState({
        usuario: "",
        senha: ""
    });

    function realizarLogin(evento) {
        login(usuario.usuario, usuario.senha).then((resposta) => {
            if (resposta?.status) {
                // Armazena o usuário no contexto após o login
                contexto.setUsuarioLogado({
                    nome: usuario.usuario,
                    logado: true,
                    token: resposta.token,
                });

                // Redireciona o usuário para a página de Cadastro de Eventos
                navigate('/cadastro-evento');
            } else {
                alert(resposta.mensagem);
            }
        }).catch((erro) => {
            alert(erro.message);
        });

        evento.preventDefault();
    }

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setUsuario({ ...usuario, [name]: value });
    }

    return (
        <Container className="border p-5 m-5">
            <Form onSubmit={realizarLogin}>
                <Form.Group className="mb-3" controlId="usuario">
                    <Form.Label>Usuário:</Form.Label>
                    <Form.Control
                        type="text"
                        name="usuario"
                        placeholder="Informe o nome do usuário"
                        value={usuario.usuario}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="senha">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control
                        type="password"
                        name="senha"
                        placeholder="Informe a senha de acesso."
                        value={usuario.senha}
                        onChange={manipularMudanca}
                    />
                </Form.Group>

                <Button variant="success" type="submit">
                    Entrar
                </Button>
            </Form>
        </Container>
    );
}
