# ---------- BUILD STAGE ----------
FROM node:22 AS builder

WORKDIR /usr/src/app

# Copiamos solo los manifests primero (mejor cacheo)
COPY package*.json ./

# Instalamos TODAS las dependencias (incluyendo dev)
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos NestJS
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:22 AS runner

WORKDIR /usr/src/app

# Copiamos solo los package.json para instalar dependencias necesarias
COPY package*.json ./

# Instalamos SOLO prod deps
RUN npm install --omit=dev

# Copiamos el build desde la etapa anterior
COPY --from=builder /usr/src/app/dist ./dist

# Copiamos las migraciones compiladas en runtime
COPY --from=builder /usr/src/app/migrations ./dist/migrations

# Copiamos startup.sh
COPY --from=builder /usr/src/app/startup.sh ./startup.sh

# Aseguramos permisos de ejecución
RUN chmod +x startup.sh

# Puerto expuesto
EXPOSE 3000

# Arranque
CMD ["./startup.sh"]

