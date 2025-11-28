FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Собираем приложение
RUN npm run build

EXPOSE 5173

# Запускаем
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]