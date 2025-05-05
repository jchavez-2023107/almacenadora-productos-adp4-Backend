# Almacenadora de Productos ADP4 Backend

## Descripción  
Aplicación web Full-Stack MERN para gestionar el inventario de una almacenadora:  
- CRUD de productos  
- Control de entradas y salidas  
- Gestión de proveedores y clientes  
- Informes y estadísticas  
- Roles, permisos y alertas

## Tecnologías  
- **Frontend:** React  
- **Backend:** Node.js, Express  
- **Base de datos:** MongoDB  
- **Autenticación:** JWT  
- **Control de versiones:** Git / GitHub

## Estructura de carpetas y responsabilidades

- **src/auth/**  
  Lógica de autenticación JWT, login, registro y control de roles.

- **src/users/**  
  CRUD de **usuarios del sistema** (administradores y empleados que usan la aplicación).

- **src/clients/**  
  CRUD de **clientes de la almacenadora** (empresas o personas que retiran productos).

- **src/products/**  
  CRUD de inventario de productos (Registrar, Editar, Eliminar, Filtrar).

- **src/movements/**  
  Registro de entradas y salidas, historial de movimientos.

- **src/suppliers/**  
  CRUD de proveedores.

- **src/reports/**  
  Generación de informes y estadísticas (inventario, movimientos, métricas).

- **src/alerts/**  
  Lógica de notificaciones y alertas (stock bajo, vencimientos).

## Primeros pasos para desarrolladores

1. Clona el repo y cambia a `develop`  
   ```bash
   git clone <URL del repo backend>
   cd almacenadora-backend
   git checkout develop


- **POSTMAN DE MI PARTE**

- **CLIENT**

1. POST: localhost:2636/api/client

{
  "name": "María López",
  "contact": "marialopez@gmail.com",
  "company": "Tech Corp",
  "product": "Almacenamiento frío"
}

2. GET: localhost:2636/api/client

3. UPDATE localhost:2636/api/client/{id}

{
  "name": "María De Jesus"
}

4. Delete: localhost:2636/api/client/{id}


- **SUPPLIERS**

1. POST: localhost:2636/api/suppliers

{
  "name": "Tech Solutions SA",
  "adress": "Av. Siempre Viva 123, Lima, Perú",
  "email": "contacto@techsolutions.com",
  "phone": "+502 98765432"
}

2. GET: localhost:2636/api/suppliers

3. PUT: localhost:2636/api/suppliers/{id}

{
  "name": "Alamcenadora 404 Not Found", 
  "phone": "+502 98765238"
}

4. DELETE localhost:2636/api/suppliers/{id}



