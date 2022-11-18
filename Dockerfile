#Asigna la versión de node en el contenedor

FROM node:16

#Crea el directorio

WORKDIR /usr/src/app

#Copia el archivo package.json
COPY package*.json ./

#Instala la libreria npm 
RUN npm install

#Copia todos los archivos del proyecto al nuevo directorio
COPY . .

#Utiliza el puerto
EXPOSE 4000

#Ejecuta el comando node index.js
CMD [ "node", "index.js" ]