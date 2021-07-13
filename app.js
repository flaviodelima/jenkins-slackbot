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
    blocks: [header, intro, divider, textAndImage, textAndImage, textAndImage]
  })

});

const header = {
  "type": "header",
  "text": {
    "type": "plain_text",
    "text": "Jenkins watcher",
    "emoji": true
  }
};

const intro = {
  "type": "section",
  "text": {
    "type": "mrkdwn",
    "text": "Hello, Assistant to the Regional Manager Dwight! *Michael Scott* wants to know where you'd like to take the Paper Company investors to dinner tonight.\n\n *Please select a restaurant:*"
  }
};

const divider = {
  "type": "divider"
};

const textAndImage = {
  "type": "section",
  "text": {
    "type": "mrkdwn",
    "text": "*Farmhouse Thai Cuisine*\n:star::star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here"
  },
  "accessory": {
    "type": "image",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg",
    "alt_text": "alt text for image"
  }
};


(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('App is running');
})();