FROM node:18.16 as production

LABEL author="András Barabás <barabasandras1@gmail.com>"

WORKDIR /usr/src

RUN chown -R node:node /usr/src

USER node

COPY --chown=node:node ./api .

RUN npm ci \
  && npm cache clean --force

EXPOSE 3000

CMD ["npm", "start"]
