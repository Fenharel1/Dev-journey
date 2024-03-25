FROM ubuntu:22.04

RUN apt update && apt install nodejs npm -y

# How to get our app code into this container image? with this COMMAND
# Copy directory - path/in/image
COPY . .

RUN npm install

#CMD ["npm","run","dev"]