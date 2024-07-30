# Use uma imagem base do Node.js
FROM node:18

# Crie um diretório para o app
WORKDIR /app

# Copie os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta que o aplicativo usa
EXPOSE 8081

# Comando para iniciar o aplicativo (ajuste conforme necessário)
CMD ["npm", "start"]
