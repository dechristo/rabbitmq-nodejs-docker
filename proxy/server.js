var amqp = require('./node_modules/amqplib/callback_api');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

var _connection = null;
var _channel = null;
var queue = "hello";

amqp.connect('amqp://rabbit-mq:5672', function(error0, connection) {
    console.log('connecting to rabbit-mq server...');
    if (error0){
            console.log(error0);
            throw error0;
        }
        _connection =  connection;

        connection.createChannel(function(error1, channel) {
            if (error1) {
                console.log(error1);
                throw error1;
            }

            console.log('channel created...');

            _channel = channel;

            _channel.assertQueue(queue, {
            durable: false
            });
        });
        // setTimeout(function() {
        //     connection.close();
        // }, 10);
    });

app.post('/message', (req, res) => {
    const text = req.body.msg;
    _channel.sendToQueue(queue, Buffer.from(text));
    console.log(" [x] Sent %s", text);
    res.send({data:{message: text }});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))