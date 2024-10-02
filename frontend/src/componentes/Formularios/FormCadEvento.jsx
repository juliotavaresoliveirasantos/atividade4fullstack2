import { useState, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { ContextoUsuarioLogado } from '../../App';
import { gravar, alterar } from '../../servicos/eventoService';

export default function FormCadEvento({ setExibirTabela, eventoSelecionado, setEventoSelecionado }) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [evento, setEvento] = useState(eventoSelecionado || {
        nome: "",
        descricao: "",
        data: "",
        local: "",
        preco: 0,
        capacidade: 0
    });

    function manipularMudanca(eventoInput) {
        const { name, value } = eventoInput.target;
        setEvento({ ...evento, [name]: value });
    }

    async function manipularSubmissao(eventoForm) {
        eventoForm.preventDefault();

        try {
            if (evento.id) {
                // Chama a função alterar para um evento existente
                await alterar(evento, contextoUsuario.usuarioLogado.token);
            } else {
                // Chama a função gravar para um novo evento
                await gravar(evento, contextoUsuario.usuarioLogado.token);
            }

            setExibirTabela(true);
        } catch (erro) {
            alert(`Erro ao salvar evento: ${erro.message}`);
        }
    }

    return (
        <Container>
            <Form onSubmit={manipularSubmissao}>
                <Form.Group>
                    <Form.Label>Nome do Evento</Form.Label>
                    <Form.Control
                        type="text"
                        name="nome"
                        value={evento.nome}
                        onChange={manipularMudanca}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="descricao"
                        value={evento.descricao}
                        onChange={manipularMudanca}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Data</Form.Label>
                    <Form.Control
                        type="date"
                        name="data"
                        value={evento.data}
                        onChange={manipularMudanca}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Local</Form.Label>
                    <Form.Control
                        type="text"
                        name="local"
                        value={evento.local}
                        onChange={manipularMudanca}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                        type="number"
                        name="preco"
                        value={evento.preco}
                        onChange={manipularMudanca}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Capacidade</Form.Label>
                    <Form.Control
                        type="number"
                        name="capacidade"
                        value={evento.capacidade}
                        onChange={manipularMudanca}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {evento.id ? "Atualizar Evento" : "Criar Evento"}
                </Button>
            </Form>
        </Container>
    );
}
