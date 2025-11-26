import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const cliente = await AuthService.login(email, password);
    if (!cliente) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    // Puedes agregar JWT aquí si lo necesitas
    return res.json({
      id: cliente.id,
      nombre: cliente.nombre,
      email: cliente.email,
      role: cliente.role
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error en login' });
  }
};
