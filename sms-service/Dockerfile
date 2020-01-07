FROM node:12
WORKDIR /app/sms-service
COPY . .
RUN npm install
EXPOSE 7000
CMD [ "node", "sms-service.js" ]