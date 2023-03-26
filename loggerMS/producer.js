import amqp from "amqplib";
import config from "./config.js";

class Producer {
  channel;

  async createChannel() {
    const connection = await amqp.connect(config.rabbitMQ.url);
    this.channel =await connection.createChannel();
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChannel();
    }
    const exchangeName = config.rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, "direct");


    const logDetails = {
      logType: routingKey,
      message,
      dateTime: new Date(),
    };

    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(`the message ${message} is sent to exchange ${exchangeName}`)
  }
}


export default Producer