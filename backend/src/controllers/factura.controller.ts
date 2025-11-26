import { FacturaModel } from '../models/factura.model';

export const getAllFacturas = async (req: any, res: any) => {
  const facturas = await FacturaModel.findAll();
  res.json(facturas);
};

export const getFacturaById = async (req: any, res: any) => {
  const { id } = req.params;
  const factura = await FacturaModel.findById(Number(id));
  if (!factura) return res.status(404).json({ error: 'No encontrada' });
  res.json(factura);
};

export const createFactura = async (req: any, res: any) => {
  const nueva = await FacturaModel.create(req.body);
  res.status(201).json(nueva);
};

export const updateFactura = async (req: any, res: any) => {
  const { id } = req.params;
  const actualizada = await FacturaModel.update(Number(id), req.body);
  res.json(actualizada);
};

export const deleteFactura = async (req: any, res: any) => {
  const { id } = req.params;
  await FacturaModel.delete(Number(id));
  res.status(204).end();
};
