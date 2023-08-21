FROM node:lts-alpine as builder

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

ARG FAUCET_URL
ENV VITE_FAUCET_URL=${FAUCET_URL}

RUN npm run build

FROM joseluisq/static-web-server
WORKDIR /public
COPY --from=builder /app/dist /public
CMD ["-d", "/public", "-p", "80", "--page-fallback", "/public/index.html"]
