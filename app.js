require('dotenv').config()
const { App } = require('@slack/bolt');
const appHome = require('./app-home.js')
const appInteract = require('./app-interactivity.js')

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.event('app_home_opened', async ({ event, client, logger }) => {
  try {
      appHome.homeOpened(event, client, logger);
      () => {

      }
  }
  catch (error) {
    logger.error(error);
  }
});

app.action('sendMessage_button1', async ({ ack, body, client, logger }) => {
  // Update the message to reflect the action
  appInteract.button(ack, body, client, logger);
});

app.action('sm-channel-selected', async ({ ack }) => {
  await ack();
});

app.view('send_message_view', async ({ ack, body, view, client, logger }) => {
  // Acknowledge the view_submission request
  await ack();

  // Assume there's an input block with `block_1` as the block_id and `input_a`
  const val = view['state']['values']['message_input_block']['message_input'];
  const user = body['user']['id'];

  // Message to send user
  let msg = view.state.values.message_input_block.message_input.value;

  // Message the user
  try {
    await client.chat.postMessage({
      channel: view.state.values.modal_channel_select_block.sm_channel_selected.selected_channel,
      text: msg
    });
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