const { Client, Message, MessageEmbed } = require('discord.js');

const { owner } = require('../config.json');

const { blacklist } = require('../data.json');

/**
 * @param {Client} bot
 * @param {Message} message
 */
module.exports = async (bot, message) => {
    await message.delete();

    blacklist.userIds.forEach(
        async userId =>
            await bot.users
                .fetch(userId)
                .then(
                    async user =>
                        await message.author
                            .send(
                                new MessageEmbed()
                                    .setAuthor(
                                        message.author.tag,
                                        message.author.avatarURL() ||
                                            message.author.defaultAvatarURL
                                    )
                                    .setColor('DARK_BUT_NOT_BLACK')
                                    .setTitle(`${user.tag} info`)
                                    .setThumbnail(
                                        user.avatarURL({
                                            format: 'png',
                                            dynamic: true,
                                            size: 2048,
                                        }) || message.author.defaultAvatarURL
                                    )
                                    .setDescription(
                                        `Information about <@${user.id}>:`
                                    )
                                    .addFields(
                                        {
                                            name: 'Username:',
                                            value: user.username,
                                            inline: true,
                                        },
                                        {
                                            name: 'User Tag:',
                                            value: user.discriminator,
                                            inline: true,
                                        },
                                        {
                                            name: 'User ID:',
                                            value: user.id,
                                            inline: true,
                                        },
                                        {
                                            name: 'User Status:',
                                            value: bot.activityStatus(
                                                user.presence.status
                                            ),
                                            inline: true,
                                        },
                                        {
                                            name:
                                                user.presence.activities
                                                    .length > 1
                                                    ? 'User Activities:'
                                                    : 'User Activity:',
                                            value:
                                                user.presence.activities
                                                    .length > 0
                                                    ? user.presence.activities.map(
                                                          activity =>
                                                              activity.name
                                                      )
                                                    : 'None',
                                            inline: true,
                                        },
                                        {
                                            name: 'Account Created At:',
                                            value: user.createdAt,
                                            inline: true,
                                        }
                                    )
                                    .setTimestamp()
                                    .setFooter(
                                        bot.user.username,
                                        bot.user.avatarURL()
                                    )
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
                                            .setTitle('ERROR')
                                            .setThumbnail(
                                                bot.user.avatarURL({
                                                    format: 'png',
                                                    dynamic: true,
                                                    size: 2048,
                                                })
                                            )
                                            .setColor('RED')
                                            .setDescription(
                                                'I can not send you private messages. Please verify your privacy settings and try again!'
                                            )
                                            .setTimestamp()
                                            .setFooter(
                                                bot.user.username,
                                                bot.user.avatarURL()
                                            )
                                    )
                                    .catch(error => console.error(error));
                            })
                )
                .catch(error => console.error(error))
    );
};
