const {app} = require("./app.js")
const views = require('./app-views.js')

async function button (ack, body, client, logger, debug_mode) {
    await ack();
    const messageView = views.getMessageView(body, debug_mode);
    
    try {
        // Call views.open with the built-in client
        const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: messageView
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