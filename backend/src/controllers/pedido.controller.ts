import { PedidoModel } from '../models/pedido.model';

export const getAllPedidos = async (req: any, res: any) => {
  const pedidos = await PedidoModel.findAll();
  res.json(pedidos);
};

export const getPedidoById = async (req: any, res: any) => {
  const { id } = req.params;
  const pedido = await PedidoModel.findById(Number(id));
  if (!pedido) return res.status(404).json({ error: 'No encontrado' });
  res.json(pedido);
};

export const createPedido = async (req: any, res: any) => {
  const nuevo = await PedidoModel.create(req.body);
  res.status(201).json(nuevo);
};

export const updatePedido = async (req: any, res: any) => {
  const { id } = req.params;
  const actualizado = await PedidoModel.update(Number(id), req.body);
  res.json(actualizado);
};

export const deletePedido = async (req: any, res: any) => {
  const { id } = req.params;
  await PedidoModel.delete(Number(id));
  res.status(204).end();
};
