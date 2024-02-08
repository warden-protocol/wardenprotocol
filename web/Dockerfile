FROM node:lts-alpine as web-builder
RUN npm install -g pnpm

WORKDIR /web
COPY package*.json .npmrc .
RUN pnpm install

COPY . .
ENV VITE_FAUCET_URL=%FAUCET_URL%
ENV VITE_WARDEN_RPC_URL=%WARDEN_RPC_URL%
ENV VITE_WARDEN_REST_URL=%WARDEN_REST_URL%
ENV VITE_WARDEN_CHAIN_ID_NUM=%WARDEN_CHAIN_ID_NUM%
ENV VITE_WARDEN_CHAIN_ID=%WARDEN_CHAIN_ID%
ENV VITE_WARDEN_CHAIN_NAME=%WARDEN_CHAIN_NAME%
RUN pnpm run build


FROM nginx:1.25.3-alpine3.18-perl as runner
WORKDIR /var/www/app
EXPOSE 8080

COPY entrypoint.sh /opt/entrypoint.sh
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=web-builder /web/dist .

RUN touch /var/run/nginx.pid && \
    chown -R 1000 /var/run/nginx.pid && \
    chown -R 1000 /var/cache/nginx && \
    chown -R 1000 /var/www/app && \
    chown -R 1000 /etc/nginx/conf.d/ && \
    mkdir -p /var/log/nginx && \
    mkdir -p /var/run/nginx && \
    chown -R 1000 /var/log/nginx && \
    chown -R 1000 /var/run/nginx/

USER 1000
ENTRYPOINT ["sh", "/opt/entrypoint.sh"]
CMD ["nginx-fe"]
