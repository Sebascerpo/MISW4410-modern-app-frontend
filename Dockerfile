# Etapa de build
FROM node:18-alpine AS build
WORKDIR /app

# Solo copiamos package.json primero para aprovechar la cache
COPY package*.json ./

# Instalamos dependencias sin node_modules previos
RUN npm ci

# Ahora copiamos el resto del proyecto
COPY . .

# Build de Angular con el nombre correcto del proyecto
RUN npm run build -- --configuration production --project=MSW-MODERN-APP-FRONTEND

# Etapa final: imagen liviana con nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist/msw-modern-app-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
