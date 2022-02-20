const app = require("./app.js")

async function homeOpened (event, client, logger) {
    // Call views.publish with the built-in client
    const result = await client.views.publish({
        // Use the user ID associated with the event
        user_id: event.user,
        view: {
          // Home tabs must be enabled in your app configuration page under "App Home"
          "type": "home",
          "blocks": [
            {
              "type": "section",
              "block_id": "home-welcome-block",
              "text": {
                "type": "mrkdwn",
                "text": "*Welcome home, <@" + event.user + "> :house:*"
              }
            },
            {
              "type": "section",
              "block_id": "home-learn-more-block",
              "text": {
                "type": "mrkdwn",
                "text": "Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>."
              }
            },
            {
              "type": "actions",
              "block_id": "home-send-message-block",
              "elements": [
                {
                  "type": "button",
                  "text": {
                    "type": "plain_text",
                    "text": "Send Message",
                    "emoji": true
                  },
                  "value": "sendMessage1",
                  "action_id": "sendMessage_button1"
                }
              ]
            }
          ]
        }
      });
  
      logger.info(result);
}

module.exports = {
    homeOpened
};