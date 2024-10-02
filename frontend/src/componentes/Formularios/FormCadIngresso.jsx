import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { gravar } from '../../servicos/ingressoService'; // Função de criar ingresso
import { consultarTodos as consultarTodosEventos } from '../../servicos/eventoService'; // Função para buscar todos os eventos

export default function FormCadIngresso({ setExibirTabela }) {
    const [ingresso, setIngresso] = useState({ tipo: '', preco: '', quantidade: 0, eventos: [] });
    const [eventos, setEventos] = useState([]); // Lista de eventos para o multi-select

    // Buscar todos os eventos ao carregar o componente
    useEffect(() => {
        consultarTodosEventos().then(response => {
            setEventos(response.listaEventos || []); // Atualiza a lista de eventos
        }).catch(error => {
            console.error('Erro ao buscar eventos:', error);
        });
    }, []);

    const manipularMudanca = (e) => {
        const { name, value } = e.target;
        setIngresso({ ...ingresso, [name]: value });
    };

    const manipularSelecaoEvento = (e) => {
        const options = e.target.options;
        const selectedEventos = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedEventos.push(options[i].value); // Adiciona o ID do evento
            }
        }
        setIngresso({ ...ingresso, eventos: selectedEventos });
    };

    const manipularSubmissao = async (e) => {
        e.preventDefault();
        try {
            await gravar(ingresso); // Envia o ingresso com os eventos associados
            setExibirTabela(true); // Exibe a tabela de ingressos
        } catch (erro) {
            console.error('Erro ao gravar ingresso:', erro);
        }
    };

    return (
        <Container>
            <Form onSubmit={manipularSubmissao}>
                <Form.Group>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control
                        type="text"
                        name="tipo"
                        value={ingresso.tipo}
                        onChange={manipularMudanca}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="preco"
                        value={ingresso.preco}
                        onChange={manipularMudanca}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantidade"
                        value={ingresso.quantidade}
                        onChange={manipularMudanca}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Eventos Associados</Form.Label>
                    <Form.Control
                        as="select"
                        multiple
                        name="eventos"
                        onChange={manipularSelecaoEvento}
                    >
                        {eventos.map((evento) => (
                            <option key={evento.id} value={evento.id}>
                                {evento.nome}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Salvar Ingresso
                </Button>
            </Form>
        </Container>
    );
}
