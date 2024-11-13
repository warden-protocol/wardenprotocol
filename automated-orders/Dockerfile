# syntax=docker/dockerfile:1

FROM node:20-slim AS base
WORKDIR /app
COPY ./yarn.lock yarn.lock
COPY ./package.json package.json
COPY ./tsconfig.json tsconfig.json

FROM base AS libs
COPY ./packages/utils-library packages/utils-library
COPY ./packages/blockchain-library packages/blockchain-library
RUN yarn install --frozen-lockfile
RUN yarn build:libs
RUN rm -rf packages/*/src packages/*/node_modules packages/*/tsconfig*

FROM base AS scheduler
COPY ./packages/scheduler packages/scheduler
COPY --from=libs ["/app/packages", "./packages"]
RUN yarn install --frozen-lockfile
RUN yarn build:scheduler
RUN rm -rf packages/*/src packages/*/node_modules packages/*/tsconfig*
CMD ["yarn", "scheduler"]

FROM base AS relayer
COPY ./packages/relayer packages/relayer
COPY --from=libs ["/app/packages", "./packages"]
RUN yarn install --frozen-lockfile
RUN yarn build:relayer
RUN rm -rf packages/*/src packages/*/node_modules packages/*/tsconfig*
CMD ["yarn", "relayer"]
