import { ClienteModel } from '../models/cliente.model';

export const getAllClientes = async (req: any, res: any) => {
  const clientes = await ClienteModel.findAll();
  res.json(clientes);
};

export const getClienteById = async (req: any, res: any) => {
  const { id } = req.params;
  const cliente = await ClienteModel.findById(Number(id));
  if (!cliente) return res.status(404).json({ error: 'No encontrado' });
  res.json(cliente);
};

export const createCliente = async (req: any, res: any) => {
  const nuevo = await ClienteModel.create(req.body);
  res.status(201).json(nuevo);
};

export const updateCliente = async (req: any, res: any) => {
  const { id } = req.params;
  const actualizado = await ClienteModel.update(Number(id), req.body);
  res.json(actualizado);
};

export const deleteCliente = async (req: any, res: any) => {
  const { id } = req.params;
  await ClienteModel.delete(Number(id));
  res.status(204).end();
};
