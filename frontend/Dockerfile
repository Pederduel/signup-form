FROM node:24-alpine AS build

WORKDIR /app

COPY ./frontend/package.json ./frontend/package-lock.json* ./

RUN npm ci

COPY ./frontend .

RUN npm run build

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json* ./

RUN npm ci --production

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./

EXPOSE 3000

CMD ["yarn", "dev"]