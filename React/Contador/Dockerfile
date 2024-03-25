FROM node:20.11.1-alpine 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

# USER node

# COPY --chown=node:node . .
COPY . .

EXPOSE 5173

CMD ["npm","run","dev"]