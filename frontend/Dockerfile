# Stage 0: Install dependencies
FROM node:18.16 as base

LABEL author="András Barabás <barabasandras1@gmail.com>"

WORKDIR /usr/src

RUN chown -R node:node /usr/src

USER node

COPY --chown=node:node ./frontend .

RUN npm ci \
  && npm cache clean --force

# Stage 1: Build
FROM base as build

RUN npm run build \
  && rm -rf node_modules \
  && npm ci --production

CMD ["npm", "cache", "clean", "--force"]

# Stage 2: Production
FROM nginx:1.24.0 AS production


WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /usr/src/dist/frontend ./
COPY ./frontend/docker/nginx/default.conf /etc/nginx/conf.d

EXPOSE 80
