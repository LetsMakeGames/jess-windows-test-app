function getHomeView (event) {
  const home_view = {
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

  return home_view;
}

function getMessageView (body) {
  const message_view = {
    type: 'modal',
    // View identifier
    callback_id: 'send_message_view',
    title: {
      type: 'plain_text',
      text: 'Send A Message'
    },
    blocks: [
      {
        "type": "input",
        "block_id": "debug_mode_block",
        "optional": true,
        "element": {
          "type": "static_select",
          "placeholder": {
            "type": "plain_text",
            "text": "Disabled",
            "emoji": true
          },
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "enabled",
                "emoji": true
              },
              "value": true
            },
            {
              "text": {
                "type": "plain_text",
                "text": "disabled",
                "emoji": true
              },
              "value": flase
            }
          ],
          "action_id": "debug_mode_toggled"
        },
        "label": {
          "type": "plain_text",
          "text": "Debog Mode Test",
          "emoji": true
        }
      },
      {
        type: "section",
        text: {
            type: "mrkdwn",
            text: "What channel would you like to message?"
        }
      },
      {
        type: "actions",
        block_id: "modal_channel_select_block",
        elements: [
            {
                type: "channels_select",
                placeholder: {
                    type: "plain_text",
                    text: "Select a channel",
                    emoji: true
                },
                action_id: "sm_channel_selected"
            }
        ]
      },
      {
        type: 'input',
        block_id: 'message_input_block',
        label: {
          type: 'plain_text',
          text: 'What is your message?'
        },
        element: {
          type: 'plain_text_input',
          action_id: 'message_input',
          multiline: true
        }
      },
      {
        type: 'input',
        block_id: 'image_input_block',
        label: {
          type: 'plain_text',
          text: 'Public Image URL:'
        },
        element: {
          type: 'plain_text_input',
          action_id: 'image_input',
          multiline: false
        },
        optional: true
      },
      {
        type: 'input',
        block_id: 'bot_name_input_block',
        label: {
          type: 'plain_text',
          text: 'Bot Username'
        },
        element: {
          type: 'plain_text_input',
          action_id: 'bot_name_input',
          multiline: true
        },
        optional: true
      },
      {
        type: 'input',
        block_id: 'bot_icon_input_block',
        label: {
          type: 'plain_text',
          text: 'Bot Avatar Public Image URL'
        },
        element: {
          type: 'plain_text_input',
          action_id: 'bot_icon_input',
          multiline: true
        },
        optional: true
      }
    ],
    submit: {
        type: 'plain_text',
        text: 'Submit'
    }
  }

  return message_view;
}

function debugMessageView (body, debug_mode) {

  if(debug_mode == true) {
    const message_view = {
      type: 'modal',
      // View identifier
      callback_id: 'send_message_view',
      title: {
        type: 'plain_text',
        text: 'Send A Message'
      },
      blocks: [
        {
          "type": "input",
          "block_id": "debug_mode_block",
          "optional": true,
          "element": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Enabled",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "enabled",
                  "emoji": true
                },
                "value": true
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "disabled",
                  "emoji": true
                },
                "value": false
              }
            ],
            "action_id": "debug_mode_toggled"
          },
          "label": {
            "type": "plain_text",
            "text": "Debog Mode Test",
            "emoji": true
          }
        },
        {
          type: "section",
          text: {
              type: "mrkdwn",
              text: `Event Body: \n\`\`\`${JSON.stringify(body)}\`\`\``
          }
        },
        {
          type: "section",
          text: {
              type: "mrkdwn",
              text: "What channel would you like to message?"
          }
        },
        {
          type: "actions",
          block_id: "modal_channel_select_block",
          elements: [
              {
                  type: "channels_select",
                  placeholder: {
                      type: "plain_text",
                      text: "Select a channel",
                      emoji: true
                  },
                  action_id: "sm_channel_selected"
              }
          ]
        },
        {
          type: 'input',
          block_id: 'message_input_block',
          label: {
            type: 'plain_text',
            text: 'What is your message?'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'message_input',
            multiline: true
          }
        },
        {
          type: 'input',
          block_id: 'image_input_block',
          label: {
            type: 'plain_text',
            text: 'Public Image URL:'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'image_input',
            multiline: false
          },
          optional: true
        },
        {
          type: 'input',
          block_id: 'bot_name_input_block',
          label: {
            type: 'plain_text',
            text: 'Bot Username'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'bot_name_input',
            multiline: true
          },
          optional: true
        },
        {
          type: 'input',
          block_id: 'bot_icon_input_block',
          label: {
            type: 'plain_text',
            text: 'Bot Avatar Public Image URL'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'bot_icon_input',
            multiline: true
          },
          optional: true
        }
      ],
      submit: {
          type: 'plain_text',
          text: 'Submit'
      }
    }
  } else {
    const message_view = {
      type: 'modal',
      // View identifier
      callback_id: 'send_message_view',
      title: {
        type: 'plain_text',
        text: 'Send A Message'
      },
      blocks: [
        {
          "type": "input",
          "block_id": "debug_mode_block",
          "optional": true,
          "element": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Disabled",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "enabled",
                  "emoji": true
                },
                "value": true
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "disabled",
                  "emoji": true
                },
                "value": false
              }
            ],
            "action_id": "debug_mode_toggled"
          },
          "label": {
            "type": "plain_text",
            "text": "Debog Mode Test",
            "emoji": true
          }
        },
        {
          type: "section",
          text: {
              type: "mrkdwn",
              text: "What channel would you like to message?"
          }
        },
        {
          type: "actions",
          block_id: "modal_channel_select_block",
          elements: [
              {
                  type: "channels_select",
                  placeholder: {
                      type: "plain_text",
                      text: "Select a channel",
                      emoji: true
                  },
                  action_id: "sm_channel_selected"
              }
          ]
        },
        {
          type: 'input',
          block_id: 'message_input_block',
          label: {
            type: 'plain_text',
            text: 'What is your message?'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'message_input',
            multiline: true
          }
        },
        {
          type: 'input',
          block_id: 'image_input_block',
          label: {
            type: 'plain_text',
            text: 'Public Image URL:'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'image_input',
            multiline: false
          },
          optional: true
        },
        {
          type: 'input',
          block_id: 'bot_name_input_block',
          label: {
            type: 'plain_text',
            text: 'Bot Username'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'bot_name_input',
            multiline: true
          },
          optional: true
        },
        {
          type: 'input',
          block_id: 'bot_icon_input_block',
          label: {
            type: 'plain_text',
            text: 'Bot Avatar Public Image URL'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'bot_icon_input',
            multiline: true
          },
          optional: true
        }
      ],
      submit: {
          type: 'plain_text',
          text: 'Submit'
      }
    }
  }

  return message_view
}

module.exports = {
  getHomeView,
  getMessageView,
  debugMessageView
}