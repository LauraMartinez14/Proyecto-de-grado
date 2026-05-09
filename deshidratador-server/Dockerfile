# Usar una imagen base más específica
FROM node:20-alpine3.19

# Agregar soporte para zonas horarias
RUN apk add --no-cache tzdata

# Instalar las dependencias necesarias
RUN apk add --no-cache npm

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto explícitamente
EXPOSE 3000

# Configurar el entorno
ENV NODE_ENV=production

# Iniciar la aplicación
CMD ["npm", "start"]
