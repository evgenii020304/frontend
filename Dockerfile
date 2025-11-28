FROM node:20-alpine

WORKDIR /app

COPY frontend/package.json ./
RUN npm install

COPY frontend/ ./

# Собираем приложение
RUN npm run build

EXPOSE 5173

# Запускаем
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]