require('dotenv').config();
const { App , LogLevel } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  //logLevel: LogLevel.DEBUG
});

let message;

app.message('hi', async ({ say }) => {
  // say() sends a message to the channel where the event was triggered
  message = await say({
    blocks: [
      header("Jenkins Watcher"),
      intro("Watches changes in Jenkins"),
      divider,
      textAndImage("Pipeline1","https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg", "food picture")]
  })

});

const header = (text) => ({
  "type": "header",
  "text": {
    "type": "plain_text",
    "emoji": true,
    text,
  }
});

const intro = (text) => ({
  "type": "section",
  "text": {
    "type": "mrkdwn",
    text,
  }
});

const divider = {
  "type": "divider"
};

const textAndImage = (text, imageUrl, altTextForImage) => ({
  "type": "section",
  "text": {
    "type": "mrkdwn",
    "text": text,
  },
  "accessory": {
    "type": "image",
    "image_url": imageUrl,
    "alt_text": altTextForImage,
  }
});


(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('App is running');
})();