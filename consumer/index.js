// consumer/index.js
const express = require('express');
const { Kafka } = require('kafkajs');

const app = express();
app.use(express.json());

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['redpanda:9092']
});

const consumer = kafka.consumer({ groupId: 'my-group' });

let messages = [];

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      messages.push({
        partition,
        offset: message.offset,
        value: message.value.toString()
      });
    }
  });
};

runConsumer().catch(console.error);

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.listen(3002, () => console.log('Consumer API running on port 3002'));
