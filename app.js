require('dotenv').config()
const { App } = require('@slack/bolt');
const appHome = require('./app-home.js')

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.event('app_home_opened', async ({ event, client, logger }) => {
    try {
        appHome.homeOpened(event, client, logger);
    }
    catch (error) {
      logger.error(error);
    }
  });

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT || 3000));

  console.log('⚡️ Bolt app is running!');
})();

module.exports = {
    app
};