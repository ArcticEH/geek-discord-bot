const {
    Client,
    Intents
} = require('discord.js')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// the 'ready' event will occur when the bot has loggged in
client.on('ready', () => {
    console.log(`GeekBot has logged in as: ${client.user.tag}!`)
});






// logs in the bot to the channel
client.login("ODk0MzY5NDU4NjM2ODUzMjU5.YVpAdw.BUJLQkxzDr5mQ7kzDn0Ag3NUk6w");