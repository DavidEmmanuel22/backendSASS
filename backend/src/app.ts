import express from 'express';
import cors from 'cors';
import clienteRoutes from './routes/cliente';
import uploadRoutes from './routes/upload';
import path from 'path';
import authRoutes from './routes/auth';
import notificacionRoutes from './routes/notificacion';
import pedidoRoutes from './routes/pedido';
import citaRoutes from './routes/cita';
import documentoRoutes from './routes/documento';
import facturaRoutes from './routes/factura';
import garajeRoutes from './routes/garaje';
import presupuestoRoutes from './routes/presupuesto';
import promocionRoutes from './routes/promocion';
import cuponRoutes from './routes/cupon';
import productoRoutes from './routes/producto';
import turnoRoutes from './routes/turno';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.use('/auth', authRoutes);
app.use('/clientes', clienteRoutes);
app.use('/notificaciones', notificacionRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/citas', citaRoutes);
app.use('/documentos', documentoRoutes);
app.use('/facturas', facturaRoutes);
app.use('/garajes', garajeRoutes);
app.use('/presupuestos', presupuestoRoutes);
app.use('/promociones', promocionRoutes);
app.use('/cupones', cuponRoutes);
app.use('/productos', productoRoutes);
app.use('/upload', uploadRoutes);
app.use('/turnos', turnoRoutes);

export default app;
