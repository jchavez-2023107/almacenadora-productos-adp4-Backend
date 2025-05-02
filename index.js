"use strict"; // Habilita el modo estricto para mejorar la seguridad y evitar errores comunes

import dotenv from "dotenv";
dotenv.config(); // Cargar variables de entorno desde .env

import { connectDB } from "./configs/mongo.js"; // Conexión a la base de datos

//Agregar los datos por defectos en un futuro
/* import { agregarUsuariosPorDefecto } from "./src/users/user.controller.js";
import { agregarClientesPorDefecto } from "./src/clients/client.controller.js";*/
import { createDefaultCategories } from "./src/category/category.default.js";
import { createDefaultProducts } from "./src/products/products.default.js";
createDefaultProducts()
createDefaultCategories()


import { initServer } from "./configs/app.js"; // Inicialización del servidor Express

// Iniciar conexión a MongoDB
(async () => {
  try {
    await connectDB(); // Esperar a que la base de datos se conecte antes de levantar el servidor


    // Espacio para llamar asíncronamente a los datos por defecto
    /* await agregarUsuariosPorDefecto();
    await agregarClientesPorDefecto();
    await agregarProductosPorDefecto(); */


    initServer(); // Inicializar el servidor Express solo si la BD está conectada
  } catch (err) {
    console.error(
      "❌ Error crítico en la inicialización de la aplicación:",
      err
    );
    process.exit(1); // Cerrar la aplicación si hay un error crítico
  }
})();

