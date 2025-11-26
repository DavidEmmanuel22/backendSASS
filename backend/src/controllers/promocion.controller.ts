

import { PromocionService } from '../services/promocion.service';
import { Request, Response } from 'express';

export const getAllPromociones = async (req: Request, res: Response) => {
  try {
    const promociones = await PromocionService.getAll();
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener promociones' });
  }
};

export const getPromocionById = async (req: Request, res: Response) => {
  try {
    const promocion = await PromocionService.getById(Number(req.params.id));
    if (!promocion) return res.status(404).json({ error: 'Promoción no encontrada' });
    res.json(promocion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la promoción' });
  }
};

export const createPromocion = async (req: Request, res: Response) => {
  try {
    const nuevaPromocion = await PromocionService.create(req.body);
    res.status(201).json(nuevaPromocion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la promoción' });
  }
};

export const updatePromocion = async (req: Request, res: Response) => {
  try {
    const promocionActualizada = await PromocionService.update(Number(req.params.id), req.body);
    res.json(promocionActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la promoción' });
  }
};

export const deletePromocion = async (req: Request, res: Response) => {
  try {
    await PromocionService.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la promoción' });
  }
};
