# producer/Dockerfile
FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY index.js ./

CMD ["node", "index.js"]
