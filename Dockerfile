#docker build --no-cache -f Dockerfile -t backend:latest .

# Use a imagem base oficial do Node.js
FROM node:lts-alpine3.20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json (se houver)
COPY package*.json ./

# Instale as dependências
RUN apk update && apk add bash
RUN npm install
RUN npm install bcryptjs
RUN npm install bcrypt @types/bcrypt
RUN npm install typeorm pg
RUN npm install -g @nestjs/cli

# Copie o restante do código da aplicação
COPY . .
COPY .env .env

# Construa a aplicação
RUN npm run build
#RUN npm run typeorm:migrate

# Exponha a porta na qual a aplicação vai rodar
EXPOSE 3336

# Defina o comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
