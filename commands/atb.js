const { Client, Message, MessageEmbed } = require('discord.js');
const { writeFile } = require('fs');
const path = require('path');

const { owner } = require('../config.json');

const data = require('../data.json');

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array<string>} args
 */
module.exports = async (bot, message, args) => {
    const trustedUserFilter = data.trustedUsers.filter(
        trustedUser => message.author.id === trustedUser
    );

    if (trustedUserFilter.length > 0 || message.author.id === owner) {
        const number = new RegExp('^[0-9]+$');

        for (const user of args) {
            if (
                data.blacklist.malornTwitterAccounts.filter(usr => usr === user)
                    .length > 0 ||
                data.blacklist.userIds.filter(usr => usr === user).length > 0 ||
                data.blacklist.usernames.filter(usr => usr === user).length > 0
            ) {
                if (user.startsWith('@')) {
                    message.channel.send(
                        new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({
                                    dynamic: true,
                                })
                            )
                            .setThumbnail(
                                bot.user.avatarURL({
                                    format: 'png',
                                    dynamic: true,
                                    size: 2048,
                                })
                            )
                            .setColor('RED')
                            .setDescription(
                                `The user \`${user}\` is already part of the blacklist.`
                            )
                            .setTimestamp()
                            .setFooter(bot.user.username, bot.user.avatarURL())
                    );
                    console.log(
                        data.blacklist.malornTwitterAccounts.filter(
                            usr => usr === user
                        )
                    );
                } else if (number.test(user)) {
                    message.channel.send(
                        new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({
                                    dynamic: true,
                                })
                            )
                            .setThumbnail(
                                bot.user.avatarURL({
                                    format: 'png',
                                    dynamic: true,
                                    size: 2048,
                                })
                            )
                            .setColor('RED')
                            .setDescription(
                                `The user <@${bot.users
                                    .fetch(user)
                                    .then(usr => usr.id)
                                    .catch(error =>
                                        String(error)
                                    )}> is already part of the blacklist.`
                            )
                            .setTimestamp()
                            .setFooter(bot.user.username, bot.user.avatarURL())
                    );
                    console.log(
                        data.blacklist.userIds.filter(usr => usr === user)
                    );
                } /* else {
                    message.channel.send(
                        new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({
                                    dynamic: true,
                                })
                            )
                            .setThumbnail(
                                bot.user.avatarURL({
                                    format: 'png',
                                    dynamic: true,
                                    size: 2048,
                                })
                            )
                            .setColor('RED')
                            .setDescription(
                                `The username \`${user}\` is already part of the blacklist.`
                            )
                            .setTimestamp()
                            .setFooter(bot.user.username, bot.user.avatarURL())
                    );
                    console.log(
                        data.blacklist.usernames.filter(usr => usr === user)
                    );
                }*/
            } else {
                if (user.startsWith('@')) {
                    data.blacklist.malornTwitterAccounts.push(
                        user.replace('@', '')
                    );
                    message.channel.send(
                        new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({
                                    dynamic: true,
                                })
                            )
                            .setThumbnail(
                                bot.user.avatarURL({
                                    format: 'png',
                                    dynamic: true,
                                    size: 2048,
                                })
                            )
                            .setColor(0x008b03)
                            .setDescription(
                                `The user \`${user}\` was correctly added to the blacklist.`
                            )
                            .setTimestamp()
                            .setFooter(bot.user.username, bot.user.avatarURL())
                    );
                } else if (number.test(user)) {
                    data.blacklist.userIds.push(user);
                    message.channel.send(
                        new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({
                                    dynamic: true,
                                })
                            )
                            .setThumbnail(
                                bot.user.avatarURL({
                                    format: 'png',
                                    dynamic: true,
                                    size: 2048,
                                })
                            )
                            .setColor(0x008b03)
                            .setDescription(
                                `The user <@${bot.users
                                    .fetch(user)
                                    .then(usr => usr.id)
                                    .catch(error =>
                                        String(error)
                                    )}> was correctly added to the blacklist.`
                            )
                            .setTimestamp()
                            .setFooter(bot.user.username, bot.user.avatarURL())
                    );
                } /* else {
                    data.blacklist.usernames.push(user);
                    message.channel.send(
                        new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({
                                    dynamic: true,
                                })
                            )
                            .setThumbnail(
                                bot.user.avatarURL({
                                    format: 'png',
                                    dynamic: true,
                                    size: 2048,
                                })
                            )
                            .setColor(0x008b03)
                            .setDescription(
                                `The username \`${user}\` was correctly added to the blacklist.`
                            )
                            .setTimestamp()
                            .setFooter(bot.user.username, bot.user.avatarURL())
                    );
                }*/
            }
        }

        writeFile(
            path.join(path.dirname(__dirname), 'data.json'),
            JSON.stringify(data, null, 4),
            'utf8',
            () => {}
        );
    } else {
        message.channel
            .send(
                new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setThumbnail(
                        bot.user.avatarURL({
                            format: 'png',
                            dynamic: true,
                            size: 2048,
                        })
                    )
                    .setColor('RED')
                    .setDescription('You are not authorized to do that.')
                    .setTimestamp()
                    .setFooter(bot.user.username, bot.user.avatarURL())
            )
            .catch(error => {
                const err = new Error(String(error));
                message.channel.send(
                    new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL()
                        )
                        .setThumbnail(
                            bot.user.avatarURL({
                                format: 'png',
                                dynamic: true,
                                size: 2048,
                            })
                        )
                        .setColor('RED')
                        .setDescription(
                            `**The next error has ocurred while I tried to send a message:**\n\n\`${err}\``
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                );
            });
    }
};
