                             // GET


const accountSid = 'ACe49d0b36e01ffc4e7455f2b995270ded';
const authToken = '7c11b3a32e225c1602109bc52343d494';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Your OTP for the registration is',
     from: '+15017122661',
     to: '+15558675310'
   })
  .then(message => console.log(message.sid));







                      // RESPPOND

                        const http = require('http');
                    const express = require('express');
                    const MessagingResponse = require('twilio').twiml.MessagingResponse;

                    const app = express();

                    app.post('/sms', (req, res) => {
                      const twiml = new MessagingResponse();

                      twiml.message('The Robots are coming! Head for the hills!');

                      res.writeHead(200, {'Content-Type': 'text/xml'});
                      res.end(twiml.toString());
                    });

                    http.createServer(app).listen(1337, () => {
                      console.log('Express server listening on port 1337');
                    });
