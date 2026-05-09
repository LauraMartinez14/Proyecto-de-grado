# Deshidratador IoT - Servidor

Servidor para el sistema de deshidratación IoT que monitorea y controla el proceso de deshidratación de alimentos.

## Características

- API REST para gestión de datos del deshidratador
- Base de datos MariaDB para almacenamiento de datos
- Sistema de autenticación y autorización
- Monitoreo en tiempo real de temperatura y humedad
- Control de parámetros del deshidratador
- Sistema de alertas y notificaciones

## Requisitos Previos

- Node.js (v14 o superior)
- Docker & Docker Compose
- Mysql
- Git

## Configuración del Proyecto

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd deshidratador-server
```

2. Copiar el archivo de configuración de entorno:
```bash
cp .env.example .env
```

3. Configurar las variables de entorno en el archivo `.env`:
   - Configuración de la base de datos
   - Configuración del servidor
   - Credenciales y tokens necesarios

4. Instalar dependencias:
```bash
npm install
```

## Configuración de Docker y Base de Datos

1. Iniciar los contenedores con Docker Compose:
```bash
docker-compose up -d
```

Este comando iniciará:
- Mysql en el puerto 3306
- phpMyAdmin en el puerto 8080 (opcional, para gestión visual de la base de datos)

2. Verificar que los contenedores estén corriendo:
```bash
docker-compose ps
```

3. Para detener los contenedores:
```bash
docker-compose down
```

4. Para ver los logs de los contenedores:
```bash
docker-compose logs -f
```

## Base de Datos

El proyecto utiliza MariaDB con Sequelize como ORM. Para configurar la base de datos:

1. Asegúrate de que los contenedores de Docker estén corriendo
2. Ejecuta las migraciones:
```bash
npm run migrate
```

## Ejecución

Para iniciar el servidor en modo desarrollo:
```bash
npm run start:dev
```

Para producción:
```bash
npm start
```

## Estructura del Proyecto

```
src/
├── assets/          # Recursos estáticos
├── config/          # Configuraciones de la aplicación
├── modules/         # Módulos de la aplicación
│   ├── health/      # Endpoints de salud del sistema
│   ├── products/    # Gestión de productos
│   └── users/       # Gestión de usuarios
├── types/           # Definiciones de tipos TypeScript
└── index.ts         # Punto de entrada de la aplicación
```

## API Endpoints

- `/api/health` - Verificación del estado del sistema
- `/api/users` - Gestión de usuarios
- `/api/products` - Gestión de productos

## Tecnologías Utilizadas

- Node.js
- Express.js
- Sequelize (ORM)
- MariaDB
- JWT para autenticación
- Socket.IO para comunicación en tiempo real

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Documentación Adicional

- [ExpressJS](https://expressjs.com/es/)
- [NodeJS](https://nodejs.org/en)
- [Sequelize Migrations](https://sequelize.org/docs/v7/cli/#creating-the-first-model-and-migration)
