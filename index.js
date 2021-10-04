var requests = require("./requests.js")

const {
    Client,
    Intents
} = require('discord.js')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// the 'messageCreate' event will occur when a message is entered into a channel
client.on('messageCreate', async message => {
    // Ignore if message was by bot
    if (message.author.bot) {
        return;
    }

    // Split message into multiple strings
    command = message.content.toLowerCase().split(" ");
    console.log(command);

    // Ignore if not a geekbot command
    if (command[0] != "geekbot") {
        return;
    }

    if (command[1] == "ram") {
        // Check Rick and Morty Commands
        if (command[2] == "char") {
            // Find characters 
            let reply = await requests.characterNameAndStatus(command[3], command[4]);
            await message.reply(reply);
        } else if (command[2] == "loc") {
            // Find locations
            let reply = await requests.locationNameAndType(command[3], command[4]);
            await message.reply(reply);
        } else if (command[2] == "ep") {
            // Find episode
            let reply = await requests.episodeNumber(command[3])
            await message.reply(reply);
        } else {
            await message.reply("Invalid command. Type 'geekbot help' for a list of commands.")
        }
    } else if (command[1] == "dnd") {
        // Check DnD Commands
        if (command[2] == "class") {
            // Find class upgrades
            let reply = await requests.classAndLevel(command[3], command[4])
            await message.reply(reply);
        } else if (command[2] == "mon") {
            // Find monsters
            let reply = await requests.monsterRating(command[3])
            await message.reply(reply);
        } else {
            await message.reply("Invalid command. Type 'geekbot help' for a list of commands.")
        }
    } else if (command[1] == "help") {
        // Send help documentation
        reply = "Rick and Morty Commands:\n1. Find Rick and Morty character by name and status --> geekbot ram char [name] [status]"
        reply += "\n2. Find Rick and Morty location by name and type --> geekbot ram loc [name] [type]"
        reply += "\n3. Find Rick and Morty episode by number --> geekbot ram ep [episode number]"

        reply += "\n\nDungeons and Dragons Commands:\n1. Level up info by class and level --> geek bot dnd class [class] [level]"
        reply += "\n2. Monster by challenge rating --> geekbot dnd mon [challenge rating]"

        await message.reply(reply);
    } else {
        // Send invalid request
        await message.reply("Invalid command. Type 'geekbot help' for a list of commands.")
    }

});

// the 'ready' event will occur when the bot has loggged in
client.on('ready', () => {
    console.log(`GeekBot has logged in as: ${client.user.tag}!`)
});

// logs in the bot to the channel
client.login("ODk0MzY5NDU4NjM2ODUzMjU5.YVpAdw.BUJLQkxzDr5mQ7kzDn0Ag3NUk6w");