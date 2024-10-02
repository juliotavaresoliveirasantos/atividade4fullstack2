import Ingresso from '../models/Ingresso.js';
import Evento from '../models/Evento.js';

class IngressoController {
    // Criar ingresso e associar a eventos
    async criarIngresso(req, res) {
        try {
            const { tipo, preco, quantidade, eventos } = req.body;

            // Cria o ingresso sem referência direta a eventos
            const ingresso = await Ingresso.create({ tipo, preco, quantidade });

            if (eventos && eventos.length > 0) {
                // Associa o ingresso aos eventos (N:N)
                await ingresso.setEventos(eventos);  // Recebe um array de IDs de eventos
            }

            res.status(201).json(ingresso);
        } catch (error) {
            console.error('Erro ao criar ingresso:', error);
            res.status(400).json({ erro: 'Erro ao criar ingresso: ' + error.message });
        }
    }

  async listarIngressos(req, res) {
    try {
      const ingressos = await Ingresso.findAll();
      res.json(ingressos);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao listar ingressos: ' + error.message });
    }
  }

  async atualizarIngresso(req, res) {
    try {
      const { id } = req.params;
      await Ingresso.update(req.body, { where: { id } });
      res.json({ mensagem: 'Ingresso atualizado com sucesso!' });
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao atualizar ingresso: ' + error.message });
    }
  }

  async excluirIngresso(req, res) {
    try {
      const { id } = req.params;
      await Ingresso.destroy({ where: { id } });
      res.json({ mensagem: 'Ingresso excluído com sucesso!' });
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao excluir ingresso: ' + error.message });
    }
  }

  async buscarIngressoPorId(req, res) {
    try {
      const { id } = req.params;
      const ingresso = await Ingresso.findByPk(id);
      if (ingresso) {
        res.json(ingresso);
      } else {
        res.status(404).json({ mensagem: 'Ingresso não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao buscar ingresso: ' + error.message });
    }
  }
}

export default new IngressoController();