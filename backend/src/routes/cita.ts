import { Router } from 'express';
import * as citaController from '../controllers/cita.controller';

const router = Router();

router.get('/', citaController.getAllCitas);
router.get('/:id', citaController.getCitaById);
router.post('/', citaController.createCita);
router.put('/:id', citaController.updateCita);
router.delete('/:id', citaController.deleteCita);

export default router;
