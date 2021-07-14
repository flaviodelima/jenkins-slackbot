require('dotenv').config();
const { App , LogLevel } = require('@slack/bolt');
const {divider, header, intro, textAndImage} = require('./messageBlocks')

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  //logLevel: LogLevel.DEBUG
});

app.message('hi', async ({ say }) => {
  let message;
  console.log("received hi")
  // say() sends a message to the channel where the event was triggered
  message = await say({
    blocks: [
      header("Jenkins Watcher"),
      intro("Watches changes in Jenkins"),
      divider,
      textAndImage("Pipeline1","https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg", "food picture")
    ]
  })

  counter = 0;

  async function updateThisMessage() {
    await rewriteMessage(message.channel, message.ts, [
      header("Jenkins Watcher"),
        intro(`Watches changes in Jenkins- count ${counter++}`),
        divider,
        textAndImage("Pipeline1","https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg", "food picture")
    ])
  }
  setInterval(updateThisMessage, 1000)
});

async function rewriteMessage(channel, ts, blocks){
  await app.client.chat.update({
    // The token you used to initialize your app
    token: process.env.SLACK_BOT_TOKEN,
    channel,
    ts,
    blocks});
    return
}

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('App is running');
})();