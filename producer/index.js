// producer/index.js
const express = require('express');
const { Kafka } = require('kafkajs');

const app = express();
app.use(express.json());

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['redpanda:9092']
});

const producer = kafka.producer();

producer.connect().then(() => console.log('Producer connected'));

app.post('/send', async (req, res) => {
  const { topic, message } = req.body;

  try {
    await producer.send({
      topic,
      messages: [{ value: message }]
    });
    res.status(200).send('Message sent successfully');
  } catch (error) {
    res.status(500).send('Error sending message');
  }
});

app.listen(3001, () => console.log('Producer API running on port 3001'));
