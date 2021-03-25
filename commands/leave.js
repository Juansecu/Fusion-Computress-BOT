const { Client, Message, MessageEmbed } = require('discord.js');

/**
 * @param {Client} bot
 * @param {Message} message
 */
module.exports = async (bot, message) => {
    message.delete();

    const botOwner = await bot
        .fetchApplication()
        .then(clientApplication => clientApplication.owner)
        .catch(error => console.error(error));

    if (message.author.id !== botOwner.id) return;

    bot.guilds.cache.map(guild =>
        guild.leave().catch(error => console.error(error))
    );
};
