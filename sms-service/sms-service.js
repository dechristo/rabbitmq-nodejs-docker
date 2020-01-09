var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbit-mq:5672', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function reply(msg) {
            console.log(" ->> Received:", msg);
            let mappedInt = 0;
            switch(msg.content.toString()) {
                case 'aaa': mappedInt = 1000;
                    break
                case 'bbb': mappedInt = 2000;
                    break
                case 'ccc': mappedInt = 3000;
                    break
                default: mappedInt = 9999;
            }

            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(mappedInt.toString()), {
                  correlationId: msg.properties.correlationId
                });
              channel.ack(msg);
        });
    });
});