const { Client, Message, MessageEmbed, UserManager } = require('discord.js');

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array<string>} args
 */
module.exports = async (bot, message, args) => {
    if (args.length === 0) {
        message.channel.send(
            new MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.avatarURL({
                        dynamic: true,
                    }) || message.author.defaultAvatarURL
                )
                .setColor(0x008b03)
                .setTitle(`${message.author.tag} info`)
                .setThumbnail(
                    message.author.avatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048,
                    }) || message.author.defaultAvatarURL
                )
                .setDescription(`Information about <@${message.author.id}>:`)
                .addFields(
                    {
                        name: 'Username:',
                        value: message.author.username,
                        inline: true,
                    },
                    {
                        name: 'User Tag:',
                        value: message.author.discriminator,
                        inline: true,
                    },
                    {
                        name: 'User ID:',
                        value: message.author.id,
                        inline: true,
                    },
                    {
                        name: 'User Status:',
                        value: bot.activityStatus(
                            message.author.presence.status
                        ),
                        inline: true,
                    },
                    {
                        name:
                            message.author.presence.activities.length > 1
                                ? 'User Activities:'
                                : 'User Activity:',
                        value:
                            message.author.presence.activities.length > 0
                                ? message.author.presence.activities.map(
                                      activity => activity.name
                                  )
                                : 'None',
                        inline: true,
                    },
                    {
                        name: 'Account created at:',
                        value: message.author.createdAt,
                        inline: true,
                    }
                )
                .setTimestamp()
                .setFooter(bot.user.username, bot.user.avatarURL())
        );
    } else {
        for (const userId of args) {
            if (userId.match(/^(<@)/)) {
                message.mentions.users.map(async user => {
                    await new UserManager(bot)
                        .fetch(user.id)
                        .then(userInfo => {
                            message.channel.send(
                                new MessageEmbed()
                                    .setAuthor(
                                        message.author.tag,
                                        message.author.avatarURL({
                                            dynamic: true,
                                        }) || userInfo.defaultAvatarURL
                                    )
                                    .setColor(0x008b03)
                                    .setTitle(`${userInfo.tag} info`)
                                    .setThumbnail(
                                        userInfo.avatarURL({
                                            format: 'png',
                                            dynamic: true,
                                            size: 2048,
                                        }) || userInfo.defaultAvatarURL
                                    )
                                    .setDescription(
                                        `Information about <@${userInfo.id}>:`
                                    )
                                    .addFields(
                                        {
                                            name: 'Username:',
                                            value: userInfo.username,
                                            inline: true,
                                        },
                                        {
                                            name: 'User Tag:',
                                            value: userInfo.discriminator,
                                            inline: true,
                                        },
                                        {
                                            name: 'User ID:',
                                            value: userInfo.id,
                                            inline: true,
                                        },
                                        {
                                            name: 'User Status:',
                                            value: bot.activityStatus(
                                                userInfo.presence.status
                                            ),
                                            inline: true,
                                        },
                                        {
                                            name:
                                                userInfo.presence.activities
                                                    .length > 1
                                                    ? 'User Activities:'
                                                    : 'User Activity:',
                                            value:
                                                userInfo.presence.activities
                                                    .length > 0
                                                    ? userInfo.presence.activities.map(
                                                          activity =>
                                                              activity.name
                                                      )
                                                    : 'None',
                                            inline: true,
                                        },
                                        {
                                            name: 'Account Created At:',
                                            value: userInfo.createdAt,
                                            inline: true,
                                        }
                                    )
                                    .setTimestamp()
                                    .setFooter(
                                        bot.user.username,
                                        bot.user.avatarURL()
                                    )
                            );
                        })
                        .catch(error => {
                            console.error(error);
                            message.channel.send(
                                new MessageEmbed()
                                    .setAuthor(
                                        message.author.tag,
                                        message.author.avatarURL({
                                            dynamic: true,
                                        }) || message.author.defaultAvatarURL
                                    )
                                    .setColor('RED')
                                    .setDescription(
                                        `Sorry. I couldn\'t find that User. Please, verify the User ID and try again.\n\n**User ID:** \`${userId}\``
                                    )
                                    .setTimestamp()
                                    .setFooter(
                                        bot.user.username,
                                        bot.user.avatarURL()
                                    )
                            );
                        });
                });

                break;
            } else if (!userId.match(/^\d$/)) {
                await bot.users
                    .fetch(userId)
                    .then(user => {
                        message.channel.send(
                            new MessageEmbed()
                                .setAuthor(
                                    message.author.tag,
                                    message.author.avatarURL({
                                        dynamic: true,
                                    }) || message.author.defaultAvatarURL
                                )
                                .setColor(0x008b03)
                                .setTitle(`${user.tag} info`)
                                .setThumbnail(
                                    user.avatarURL({
                                        format: 'png',
                                        dynamic: true,
                                        size: 2048,
                                    }) || user.defaultAvatarURL
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
                                            user.presence.activities.length > 1
                                                ? 'User Activities:'
                                                : 'User Activity:',
                                        value:
                                            user.presence.activities.length > 0
                                                ? user.presence.activities.map(
                                                      activity => activity.name
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
                        );
                    })
                    .catch(error => {
                        console.error(error);
                        message.channel.send(
                            new MessageEmbed()
                                .setAuthor(
                                    message.author.tag,
                                    message.author.avatarURL({
                                        dynamic: true,
                                    }) || message.author.defaultAvatarURL
                                )
                                .setColor('RED')
                                .setDescription(
                                    `Sorry. I couldn\'t find that User. Please, verify the \`User ID\` and try again.\n\n**User ID:** \`${userId}\``
                                )
                                .setTimestamp()
                                .setFooter(
                                    bot.user.username,
                                    bot.user.avatarURL()
                                )
                        );
                    });
            } else {
                message.channel.send(
                    new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({
                                dynamic: true,
                            }) || message.author.defaultAvatarURL
                        )
                        .setColor('RED')
                        .setDescription(
                            `The \`User ID\` is not valid.\n\n**User ID:** \`${userId}\``
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                );
            }
        }
    }
};
