import { useState, useEffect, useContext } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import FormCadEvento from "../Formularios/FormCadEvento";
import TabelaEventos from "../Tabelas/TabelaEventos";
import Pagina from "../Templates/Pagina";
import { consultarTodos } from "../../servicos/eventoService";
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroEvento() {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);  // Controla se a tabela ou o formulário será exibido
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [listaDeEventos, setListaDeEventos] = useState([]);

    // Fetching all events
    useEffect(() => {
        if (contextoUsuario.usuarioLogado?.token) {
            consultarTodos(contextoUsuario.usuarioLogado.token)
                .then((resposta) => {
                    console.log("Eventos retornados: ", resposta);
                    if (resposta && resposta.length > 0) {
                        setListaDeEventos(resposta);  // Armazena os eventos no estado
                    } else {
                        setListaDeEventos([]);  // Caso não haja eventos
                    }
                })
                .catch((erro) => {
                    alert("Erro ao consultar eventos: " + erro.message);
                });
        }
    }, [contextoUsuario.usuarioLogado]);

    // Função para criar um novo evento
    const criarNovoEvento = () => {
        setEventoSelecionado(null);  // Limpa a seleção de evento
        setExibirTabela(false);  // Exibe o formulário para criação de novo evento
    };

    return (
        <Pagina>
            <Alert className="mt-2 mb-2 text-center" variant="success">
                <h2>Cadastro de Eventos</h2>
            </Alert>
            {exibirTabela ? (
                <Container>
                    <Button
                        className="mb-3"
                        variant="primary"
                        onClick={criarNovoEvento}
                    >
                        Adicionar Novo Evento
                    </Button>
                    <TabelaEventos
                        listaDeEventos={listaDeEventos}
                        setExibirTabela={setExibirTabela}
                        setEventoSelecionado={setEventoSelecionado}
                    />
                </Container>
            ) : (
                <FormCadEvento
                    setExibirTabela={setExibirTabela}
                    eventoSelecionado={eventoSelecionado}
                    setEventoSelecionado={setEventoSelecionado}
                />
            )}
        </Pagina>
    );
}
