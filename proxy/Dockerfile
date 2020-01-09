FROM node:12
WORKDIR /app/proxy
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "node", "server.js" ]