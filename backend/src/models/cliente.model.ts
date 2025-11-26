import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const ClienteModel = {
  async findAll() {
    return prisma.cliente.findMany({ include: { direcciones: true, pedidos: true } });
  },
  async findById(id: number) {
    return prisma.cliente.findUnique({ where: { id }, include: { direcciones: true, pedidos: true } });
  },
  async create(data: any) {
    // Permitir avatar, idioma, ciudad
    return prisma.cliente.create({ data });
  },
  async update(id: number, data: any) {
    // Permitir avatar, idioma, ciudad. Eliminar 'direccion' si viene en data
    const { direccion, ...rest } = data;
    return prisma.cliente.update({ where: { id }, data: rest });
  },
  async delete(id: number) {
    return prisma.cliente.delete({ where: { id } });
  }
};
