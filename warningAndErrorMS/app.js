import amqp from "amqplib";
import config from "./config.js";

async function consumeMessage() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeName = config.rabbitMQ.exchangeName;
  await channel.assertExchange(exchangeName, "direct");

  const q = await channel.assertQueue("WarningAndErrorQueue");
  await channel.bindQueue(q.queue, exchangeName, "Warning");
  await channel.bindQueue(q.queue, exchangeName, "Error");

  channel.consume(q.que, (msg) => {
    const data = JSON.parse(msg.content);
    console.log(data);
    channel.ack(msg);
  });
}

consumeMessage();
