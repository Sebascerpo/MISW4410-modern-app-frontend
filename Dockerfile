# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build -- --configuration production --project MSW-MODERN-APP-FRONTEND

# Etapa de producción con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/msw-modern-app-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
