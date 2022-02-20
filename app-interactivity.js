const app = require("./app.js")

async function button (ack, body, client, logger) {
    await ack();
    
    try {
        // Call views.open with the built-in client
        const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {
            type: 'modal',
            // View identifier
            callback_id: 'view_1',
            title: {
              type: 'plain_text',
              text: 'Modal title'
            },
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "What channel would you like to message?"
                    }
                },
                {
                    type: "actions",
                    elements: [
                        {
                            type: "channels_select",
                            placeholder: {
                                type: "plain_text",
                                text: "Select a channel",
                                emoji: true
                            },
                            action_id: "actionId-1"
                        }
                    ]
                },
                {
                    type: 'input',
                    block_id: 'input_b',
                    label: {
                      type: 'plain_text',
                      text: 'What is your message?'
                    },
                    element: {
                      type: 'plain_text_input',
                      action_id: 'message_input',
                      multiline: true
                    }
                }
            ],
            submit: {
                type: 'plain_text',
                text: 'Submit'
            }
            }
        });
        
        logger.info(result);
    }
    
    catch (error) {
        logger.error(error);
    }
}

module.exports = {
    button
};