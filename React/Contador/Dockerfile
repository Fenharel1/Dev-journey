FROM node:20.11.1-alpine 

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

# USER node

# COPY --chown=node:node . .
COPY . .

EXPOSE 8000

CMD ["npm","run","dev"]