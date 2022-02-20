require('dotenv').config()
const { App } = require('@slack/bolt');
const appHome = require('./app-home.js')
const appInteract = require('./app-interactivity.js')
const views = require('./app-views.js')

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

let debug_mode = false;

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
  debug_mode = false;
  appInteract.button(ack, body, client, logger, debug_mode);
});

app.action('sm-channel-selected', async ({ ack }) => {
  await ack();
});

app.action('debug-message-view-action', async ({ ack, body, client, logger, view }) => {
  await ack();
  debug_mode = !debug_mode

  try {
    updatedView = views.debugMessageView(body, debug_mode);
    // Call views.update with the built-in client
    const result = await client.views.update({
      // Pass the view_id
      view_id: body.view.id,
      // Pass the current hash to avoid race conditions
      hash: body.view.hash,
      // View payload with updated blocks
      view: {
        type: 'modal',
        // View identifier
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Updated modal'
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: 'You updated the modal!'
            }
          },
          {
            type: 'image',
            image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
            alt_text: 'Yay! The modal was updated'
          }
        ]
      }
    });
    logger.info(result);
  }
  catch (error) {
    logger.error(error);
  }


});

app.view('send_message_view', async ({ ack, body, view, client, logger }) => {
  // Acknowledge the view_submission request
  await ack();

  // Assume there's an input block with `block_1` as the block_id and `input_a`
  const val = view['state']['values']['message_input_block']['message_input'];
  const user = body['user']['id'];
  const inputs = view.state.values;

  // Message to send user
  let msg = inputs.message_input_block.message_input.value;
  let img = inputs.image_input_block.image_input.value;

  // Bot Customizations to use for message
  let bot = {
    username: inputs.bot_name_input_block.bot_name_input.value,
    icon: inputs.bot_icon_input_block.bot_icon_input.value
  }

  if (img != null) {
    try {

      await client.chat.postMessage({

        channel: view.state.values.modal_channel_select_block.sm_channel_selected.selected_channel,
        username: bot.username,
        icon_url: bot.icon,
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": msg
            }
          },
          {
            "type": "image",
            "title": {
              "type": "plain_text",
              "text": "A public shared image",
              "emoji": true
            },
            "image_url": img,
            "alt_text": "image"
          }
        ]

      });
    }

    catch (error) {
      logger.error(error);
    }
  } else {
    // Message the user
  try {
    await client.chat.postMessage({
      channel: view.state.values.modal_channel_select_block.sm_channel_selected.selected_channel,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": msg
          }
        }
      ]
    });
  }
  catch (error) {
    logger.error(error);
  }
  }
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT || 3000));

  console.log('⚡️ Bolt app is running!');
})();