FROM node:12
WORKDIR /app/frontend/messages
COPY . .
RUN npm install -g @angular/cli
RUN npm install && npm run build
EXPOSE 4200
CMD [ "ng", "serve", "--host", "0.0.0.0"]
