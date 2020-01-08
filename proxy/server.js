var amqp = require('./node_modules/amqplib/callback_api');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors());

app.post('/message', (req, res) => {
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
            res.send({data:{ msg }});
        });
        setTimeout(function() {
            connection.close();
        }, 10);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))