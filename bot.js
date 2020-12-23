const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');

const { token } = require('./config.json');

const { activityStatus } = require('./functions/customDiscordData');

const bot = new Client();

(()=> {
    bot.activityStatus = activityStatus;
    bot.commands = new Collection();
})();

for(const file of readdirSync('./commands/')) {
    if (file.endsWith('.js')) {
        const fileName = file.substring(0, file.length - 3);
        const fileContents = require(`./commands/${file}`);

        bot.commands.set(fileName, fileContents);
    }
}

for(const file of readdirSync('./events/')) {
    if (file.endsWith('.js')) {
        const fileName = file.substring(0, file.length - 3);
        const fileContents = require(`./events/${file}`);

        bot.on(fileName, fileContents.bind(null, bot));

        delete require.cache[require.resolve(`./events/${file}`)];
    }
}

bot.login(token)
    .then(() => console.log('I\'m ready!'))
    .catch(error => console.log(error));