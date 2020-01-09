var amqp = require('./node_modules/amqplib/callback_api');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

var _connection = null;
var _queue = "hello";
let correlation = 1;

amqp.connect('amqp://rabbit-mq:5672', function(error0, connection) {
    console.log('connecting to rabbit-mq server...');
    if (error0){
            console.log(error0);
            throw error0;
        }
        _connection =  connection;
    });

app.post('/message', (req, res) => {
    const text = req.body.msg;
    const msgId = correlation.toString();

    _connection.createChannel(function(error1, channel) {
        if (error1) {
            console.log(error1);
            throw error1;
        }

        console.log('channel created...');

        channel.assertQueue('', {
            exclusive: true
          }, function(error2, q) {
            if (error2) {
              throw error2;
            }

            _queue = q.queue;

            channel.consume(_queue, function(msg) {
                console.log('Message Id Generated:', msgId);
                console.log('Message Id:', msg.properties.correlationId);
                if (msg.properties.correlationId == msgId) {
                  console.log(' [.] Got %s', msg.content.toString());
                  res.send({data:{message: msg.content.toString() }});
                }
              }, {
                noAck: true
              });
              channel.sendToQueue('hello',
                Buffer.from(text),{
                  correlationId:  msgId,
                  replyTo: _queue }
                );
                console.log(" [x] Sent %s", text);
                correlation++;
            });
        }
    );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))