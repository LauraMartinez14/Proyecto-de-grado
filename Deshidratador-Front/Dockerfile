FROM node:20-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runner
RUN rm -rf /usr/share/nginx/html/*

# Copiar el build de Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# CAMBIO AQUÍ: Lo copiamos a conf.d/default.conf en lugar de reemplazar el nginx.conf global
COPY ./nginx-deshidratador-app.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]