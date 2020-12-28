const { Client, Message } = require('discord.js');

const { prefix } = require('../config.json');

const { blacklist } = require('../data.json');

/**
 * @param {Client} bot 
 * @param {Message} message 
 */
module.exports = (bot, message) => {
    /*if (message.content.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)) message.delete({
        reason: 'It contents a link of a part of Internet with malicious purposes.'
    });*/

    if (blacklist.malornTwitterAccounts.filter(mta => message.content.match(new RegExp(`(${mta})`)))) message.delete();

    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = bot.commands.get(command);

    if (!cmd) return;

    cmd(bot, message, args);
}