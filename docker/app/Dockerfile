FROM --platform=linux/amd64 node:16-alpine
EXPOSE ${PORT}
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build
