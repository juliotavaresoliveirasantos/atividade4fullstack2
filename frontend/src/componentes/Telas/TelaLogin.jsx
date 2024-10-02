import { useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ContextoUsuarioLogado } from "../../App";
import { login } from "../../servicos/loginService";

export default function TelaLogin() {
    const { setUsuarioLogado } = useContext(ContextoUsuarioLogado);
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const realizarLogin = async (e) => {
        e.preventDefault();
        try {
            const resposta = await login(usuario, senha);
            if (resposta?.token) {
                setUsuarioLogado({
                    nome: usuario,
                    logado: true,
                    token: resposta.token
                });
            } else {
                alert("Login inválido.");
            }
        } catch (error) {
            alert("Erro ao fazer login: " + error.message);
        }
    };

    return (
        <Container>
            <Form onSubmit={realizarLogin}>
                <Form.Group>
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">Entrar</Button>
            </Form>
        </Container>
    );
}
