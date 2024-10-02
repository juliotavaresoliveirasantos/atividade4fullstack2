import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default function TabelaEventos({ listaDeEventos, setExibirTabela, setEventoSelecionado }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Data</th>
                    <th>Local</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {listaDeEventos && listaDeEventos.length > 0 ? (
                    listaDeEventos.map((evento, index) => (
                        <tr key={evento.id}> {/* Certifique-se de que está usando a chave correta */}
                            <td>{index + 1}</td>
                            <td>{evento.nome}</td>
                            <td>{evento.descricao}</td>
                            <td>{new Date(evento.data).toLocaleDateString()}</td>
                            <td>{evento.local}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => {
                                        setEventoSelecionado(evento);
                                        setExibirTabela(false);  // Exibe o formulário para edição de evento
                                    }}
                                >
                                    Editar
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">Nenhum evento encontrado.</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
