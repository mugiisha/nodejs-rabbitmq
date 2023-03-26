import express from "express";
import Producer from "./producer.js";

const app = express();
app.use(express.json());

const producer = new Producer();

app.post("/sendlog", async (req, res) => {
  const { logType, message } = req.body;

  await producer.publishMessage(logType, message);
  res.send()
});

app.listen(2000, ()=>{
    console.log('server started')
})