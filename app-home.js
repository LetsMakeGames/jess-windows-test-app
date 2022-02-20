const app = require("./app.js")
const views = require('./app-views.js')

async function homeOpened (event, client, logger) {
  homeView = views.getHomeView(event);
 
  // Call views.publish with the built-in client
  const result = await client.views.publish({
    // Use the user ID associated with the event
    user_id: event.user,
    view: homeView
  });

  logger.info(result);
}

module.exports = {
    homeOpened
};