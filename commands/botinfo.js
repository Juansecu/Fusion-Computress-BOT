const { Client, Message, MessageEmbed } = require('discord.js');

const { version } = require('../package.json');

/**
 * @param {Client} bot
 * @param {Message} message
 */
module.exports = async (bot, message) => {
    await bot
        .fetchApplication()
        .then(clientApplication =>
            message.channel
                .send(
                    new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({
                                dynamic: true,
                            })
                        )
                        .setTitle('Me!')
                        .setThumbnail(
                            bot.user.avatarURL({
                                format: 'png',
                                dynamic: true,
                                size: 2048,
                            })
                        )
                        .setColor(0x008b03)
                        .setDescription(
                            `**Description:** ${clientApplication.description}`
                        )
                        .addFields(
                            {
                                name: 'Version:',
                                value: version,
                                inline: true,
                            },
                            {
                                name: 'Username:',
                                value: bot.user.username,
                                inline: true,
                            },
                            {
                                name: 'Tag:',
                                value: bot.user.discriminator,
                                inline: true,
                            },
                            { name: 'ID:', value: bot.user.id, inline: true },
                            {
                                name: 'Status:',
                                value: bot.activityStatus(
                                    bot.user.presence.status
                                ),
                                inline: true,
                            },
                            {
                                name: 'Activity:',
                                value:
                                    bot.user.presence.activities.map(
                                        activity => activity.name
                                    ) || 'None',
                                inline: true,
                            },
                            {
                                name: 'User Created At:',
                                value: bot.user.createdAt,
                                inline: true,
                            },
                            {
                                name: 'Public:',
                                value: clientApplication.botPublic
                                    ? 'Yes'
                                    : 'Not',
                                inline: true,
                            },
                            {
                                name: 'Creator:',
                                value: `<@${clientApplication.owner.id}>`,
                                inline: true,
                            }
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                )
                .catch(error => console.error(error))
        )
        .catch(error => {
            console.error(error);
            message.channel
                .send(
                    new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({
                                dynamic: true,
                            })
                        )
                        .setTitle('Me!')
                        .setThumbnail(
                            bot.user.avatarURL({
                                format: 'png',
                                dynamic: true,
                                size: 2048,
                            })
                        )
                        .setColor(0x008b03)
                        .addFields(
                            {
                                name: 'Version:',
                                value: version,
                                inline: true,
                            },
                            {
                                name: 'Username:',
                                value: bot.user.username,
                                inline: true,
                            },
                            {
                                name: 'Tag:',
                                value: bot.user.discriminator,
                                inline: true,
                            },
                            { name: 'ID:', value: bot.user.id, inline: true },
                            {
                                name: 'Status:',
                                value: bot.activityStatus(
                                    bot.user.presence.status
                                ),
                                inline: true,
                            },
                            {
                                name: 'Activity:',
                                value:
                                    bot.user.presence.activities.map(
                                        activity => activity.name
                                    ) || 'None',
                                inline: true,
                            },
                            {
                                name: 'User Created At:',
                                value: bot.user.createdAt,
                                inline: true,
                            }
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                )
                .catch(error => console.error(error));
        });
    /*message.channel
        .send(
            new MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.avatarURL({
                        dynamic: true,
                    })
                )
                .setTitle('Me!')
                .setThumbnail(
                    bot.user.avatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048,
                    })
                )
                .setColor(0x008b03)
                .setDescription(
                    await bot
                        .fetchApplication()
                        .then(
                            clientApplication => clientApplication.description
                        )
                )
        )
        .catch(error => console.error(error));*/
};
