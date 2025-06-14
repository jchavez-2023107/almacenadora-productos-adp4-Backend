
import authRoutes from "./auth/auth.routes.js";
import productsRoutes from './products/products.routes.js'
import movementRoutes from '../src/movements/movement.routes.js'
import supplierRoutes from './suppliers/suppliers.routes.js'
import categoryRoutes from './category/category.routes.js'
import clientRoutes from './clients/client.routes.js'

/**
 * Función que recibe la app de Express y registra
 * todas las rutas en una sola llamada.
 */
export const rutasGenerales = (app) => {
  app.use("/api/auth", authRoutes);
  app.use('/api/products', productsRoutes)
  app.use('/api/movements', movementRoutes)
  app.use('/api/suppliers', supplierRoutes)
  app.use('/api/categorys', categoryRoutes)
  app.use('/api/client',clientRoutes)
  app.use('/almacenadora404/v1/auth', authRoutes)
}
