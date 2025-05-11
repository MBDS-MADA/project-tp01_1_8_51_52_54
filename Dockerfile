# Étape 1 : Build
FROM node:18 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine

# Copie le build dans nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Supprimer la config par défaut et ajouter une nouvelle si besoin
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
