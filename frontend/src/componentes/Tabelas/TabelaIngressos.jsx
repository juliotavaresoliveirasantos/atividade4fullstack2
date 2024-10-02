import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default function TabelaIngressos({ listaDeIngressos, setExibirTabela, setIngressoSelecionado }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tipo</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {listaDeIngressos && listaDeIngressos.length > 0 ? (
                    listaDeIngressos.map((ingresso, index) => (
                        <tr key={ingresso.id}>
                            <td>{index + 1}</td>
                            <td>{ingresso.tipo}</td>
                            <td>{typeof ingresso.preco === 'number' ? ingresso.preco.toFixed(2) : 'N/A'}</td>
                            <td>{ingresso.quantidade}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => {
                                        setIngressoSelecionado(ingresso);
                                        setExibirTabela(false);  // Exibe o formulário para edição de ingresso
                                    }}
                                >
                                    Editar
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">Nenhum ingresso encontrado.</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
