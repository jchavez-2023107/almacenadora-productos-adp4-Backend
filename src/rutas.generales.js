import authRoutes from "./auth/auth.routes.js";
import clientRoutes from "./clients/client.routes.js"
import supplierRoutes from './suppliers/suppliers.routes.js'


/**
 * Función que recibe la app de Express y registra
 * todas las rutas en una sola llamada.
 */
export const rutasGenerales = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/client", clientRoutes);
  app.use('/api/suppliers', supplierRoutes)

  
};
