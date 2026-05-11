FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# SECURITY: Switch to a non-root user
# Node images come with a 'node' user built-in. This prevents 
# potential attackers from gaining root access to the container OS.
USER node

EXPOSE 3000

CMD [ "node", "app.js" ]
