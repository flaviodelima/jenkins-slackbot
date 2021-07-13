require('dotenv').config();
const { App , LogLevel } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  //logLevel: LogLevel.DEBUG
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('App is running');
})();