FROM rabbitmq:3.7-management
EXPOSE 4369 5671 5672 25672
RUN apt-get update
RUN apt-get install -y curl 
CMD ["rabbitmq-server"]