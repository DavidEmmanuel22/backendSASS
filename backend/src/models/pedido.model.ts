import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const PedidoModel = {
  async findAll() {
    return prisma.pedido.findMany({ include: { cliente: true, items: true } });
  },
  async findById(id: number) {
    return prisma.pedido.findUnique({ where: { id }, include: { cliente: true, items: true } });
  },
  async create(data: any) {
    // Separar items y el resto de datos
    const { items, ...pedidoData } = data;
    // Elimina cualquier campo 'cliente' que pueda venir en el payload
    const { cliente, ...cleanPedidoData } = pedidoData;
    return prisma.pedido.create({
      data: {
        ...cleanPedidoData,
        items: { create: items }
      },
      include: { items: true, cliente: true }
    });
  },
  async update(id: number, data: any) {
    return prisma.pedido.update({ where: { id }, data });
  },
  async delete(id: number) {
    return prisma.pedido.delete({ where: { id } });
  }
};
