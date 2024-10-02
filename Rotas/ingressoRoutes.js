import { Router } from 'express';
import IngressoController from '../Controle/ingressoCtrl.js';

const router = Router();

router.post('/', IngressoController.criarIngresso); // Criar ingresso e associar a eventos
router.get('/', IngressoController.listarIngressos); // Verifique se listarIngressos está definido no controlador
router.get('/:id', IngressoController.buscarIngressoPorId); // Verifique se buscarIngressosPorId está definido no controlador
router.put('/:id', IngressoController.atualizarIngresso); // Verifique se atualizarIngresso está definido no controlador
router.delete('/:id', IngressoController.excluirIngresso); // Verifique se excluirIngresso está definido no controlador

export default router;
