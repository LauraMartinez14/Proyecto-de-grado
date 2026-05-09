FROM nginx:alpine

# Copiar los archivos pre-compilados directamente
COPY dist /usr/share/nginx/html

COPY ./nginx-deshidratador-app.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
