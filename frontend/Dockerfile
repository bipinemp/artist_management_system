FROM node:21.7.1-alpine
WORKDIR /react-app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]