const { Client, Message } = require('discord.js');

const { prefix } = require('../config.json');

/**
 * @param {Client} bot 
 * @param {Message} message 
 */
module.exports = (bot, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = bot.commands.get(command);

    if (!cmd) return;

    cmd(bot, message, args);
}