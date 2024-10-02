import { useState, useEffect, useContext } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import FormCadIngresso from "../Formularios/FormCadIngresso";
import TabelaIngressos from "../Tabelas/TabelaIngressos";
import Pagina from "../Templates/Pagina";
import { consultarTodos } from "../../servicos/ingressoService";  // Função que busca os ingressos no backend
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroIngresso() {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);  // Controla se a tabela ou o formulário será exibido
    const [ingressoSelecionado, setIngressoSelecionado] = useState(null);
    const [listaDeIngressos, setListaDeIngressos] = useState([]);

    // Fetching all tickets (ingressos)
    useEffect(() => {
        if (contextoUsuario.usuarioLogado?.token) {
            consultarTodos(contextoUsuario.usuarioLogado.token)
                .then((resposta) => {
                    console.log("Ingressos retornados: ", resposta);
                    if (resposta && resposta.length > 0) {
                        setListaDeIngressos(resposta);  // Armazena os ingressos no estado
                    } else {
                        setListaDeIngressos([]);  // Caso não haja ingressos
                    }
                })
                .catch((erro) => {
                    alert("Erro ao consultar ingressos: " + erro.message);
                });
        }
    }, [contextoUsuario.usuarioLogado]);

    // Função para criar um novo ingresso
    const criarNovoIngresso = () => {
        setIngressoSelecionado(null);  // Limpa a seleção de ingresso
        setExibirTabela(false);  // Exibe o formulário para criação de novo ingresso
    };

    return (
        <Pagina>
            <Alert className="mt-2 mb-2 text-center" variant="success">
                <h2>Cadastro de Ingressos</h2>
            </Alert>
            {exibirTabela ? (
                <Container>
                    <Button
                        className="mb-3"
                        variant="primary"
                        onClick={criarNovoIngresso}
                    >
                        Adicionar Novo Ingresso
                    </Button>
                    <TabelaIngressos
                        listaDeIngressos={listaDeIngressos}
                        setExibirTabela={setExibirTabela}
                        setIngressoSelecionado={setIngressoSelecionado}
                    />
                </Container>
            ) : (
                <FormCadIngresso
                    setExibirTabela={setExibirTabela}
                    ingressoSelecionado={ingressoSelecionado}
                    setIngressoSelecionado={setIngressoSelecionado}
                />
            )}
        </Pagina>
    );
}
