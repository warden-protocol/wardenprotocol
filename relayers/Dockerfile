FROM node:20-alpine as build
RUN apk update && apk add python3 make g++
WORKDIR /build
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:20-slim as wormhole-relayer
WORKDIR /app
COPY --from=build ["/build/node_modules", "node_modules/"]
COPY --from=build ["/build/packages/wormhole/dist", "dist/"]
COPY --from=build ["/build/packages/wormhole/package.json", "./"]
CMD ["yarn", "start"]
