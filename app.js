require('dotenv').config();
const { App , LogLevel } = require('@slack/bolt');

const {pipelinesData}= require('./jenkinsFetcher')
const {buildMessage} = require('./messageBuilder')
const {header} = require('./messageBlocks')

//console.log(pipelinesData());
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  //logLevel: LogLevel.DEBUG
});

async function sendPipelineMessage(){
  const data = await pipelinesData();
  const message = await buildMessage(data);
  return sendMessageToChannel(message);
}

async function sendMessageToChannel(blocks, channel){
  if(!channel){
    channel = process.env.SLACK_BOT_CHANNEL;
  }
  
  return await app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel,
    blocks,
  })
}

async function updateMessage(ts, blocks, channel){
  if(!channel){
    channel = process.env.SLACK_BOT_CHANNEL;
  }

  return await app.client.chat.update({
    // The token you used to initialize your app
    token: process.env.SLACK_BOT_TOKEN,
    channel,
    ts,
    blocks
  });
}

async function sendAndUpdateMessage(message){
  let counter = 0;
  let sentMessage = await sendMessageToChannel([... message, header(`${counter++}`)]);

  async function updateThisMessage() {
    sentMessage = await updateMessage(sentMessage.ts,
      [... message, header(`${counter++}`)]
    )
  }
  setInterval(updateThisMessage, 3000);
  return;
}

sendPipelineMessage();
//sendAndUpdateMessage([header('Jenkins')]);

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('App is running');
})();