var amqp = require('./node_modules/amqplib/callback_api');
console.log('starting...');
amqp.connect('amqp://localhost', function(error0, connection) {
console.log('connecting to rabbit-mq server...');    
if (error0){
        console.log(error0);
         throw error0;
     }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            console.log(error1);
            throw error1;
        }

        console.log('channel created...');

        var queue = 'hello';
        var msg = 'Hello world';

        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
         connection.close();
         process.exit(0);
    }, 10);
});