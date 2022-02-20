const {app} = require("./app.js")

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
            callback_id: 'send_message_view',
            title: {
              type: 'plain_text',
              text: 'Send A Message'
            },
            blocks: [
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

async function modalSubmission (ack, body, client, logger) {
    await ack();
}

module.exports = {
    button,
    modalSubmission
};