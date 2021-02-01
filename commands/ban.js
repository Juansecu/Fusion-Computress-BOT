const { Client, Message, MessageEmbed, Permissions } = require('discord.js');

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array<string>} args
 */
module.exports = async (bot, message, args) => {
    // Checks if the BOT has the default permissions or Administrator permissions:
    if (
        message.member.hasPermission('BAN_MEMBERS') ||
        message.member.hasPermission('ADMINISTRATOR')
    ) {
        if (args.length === 0)
            message.channel
                .send(
                    new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({
                                dynamic: true,
                            })
                        )
                        .setTitle('MISSING ARGUMENTS')
                        .setThumbnail(
                            bot.user.avatarURL({
                                format: 'png',
                                dynamic: true,
                                size: 2048,
                            })
                        )
                        .setColor('RED')
                        .setDescription(
                            'You have not especified a member to ban. Specify a user and try again.'
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                )
                .catch(error => console.error(error));
        else if (args.length > 1) {
            if (args[0].match(/^\d$/))
                await bot.users
                    .fetch(args[0])
                    .then(user =>
                        message.channel
                            .send(
                                new MessageEmbed()
                                    .setAuthor(
                                        message.author.tag,
                                        message.author.avatarURL({
                                            dynamic: true,
                                        }) || message.author.defaultAvatarURL
                                    )
                                    .setTitle('User banned')
                                    .setThumbnail(
                                        user.avatarURL({
                                            format: 'png',
                                            dynamic: true,
                                            size: 2048,
                                        }) || user.defaultAvatarURL
                                    )
                                    .setColor(0x008b03)
                                    .setDescription(
                                        `**User banned:** <@${args[0]}>:`
                                    )
                                    .addFields(
                                        {
                                            name: 'Username:',
                                            value: user.username,
                                            inline: true,
                                        },
                                        {
                                            name: 'User Discriminator:',
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
                                            name: 'User Activities:',
                                            value: user.presence.activities.forEach(
                                                activity => activity.name
                                            ),
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
                            .catch(error => console.error(error))
                    )
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
                                .setTitle('User not found')
                                .setThumbnail(
                                    bot.user.avatarURL({
                                        format: 'png',
                                        dynamic: true,
                                        size: 2048,
                                    })
                                )
                                .setColor('RED')
                                .setDescription(
                                    `I could not find the user \`${args[0]}\`. Please verify the User ID and try again.`
                                )
                                .setTimestamp()
                                .setFooter(
                                    bot.user.username,
                                    bot.user.avatarURL()
                                )
                        );
                    });
        } else if (args.length === 1)
            message.channel
                .send(new MessageEmbed())
                .catch(error => console.error(error));
    } else
        message.channel
            .send(
                new MessageEmbed()
                    .setAuthor(
                        message.author.tag,
                        message.author.avatarURL({
                            dynamic: true,
                        })
                    )
                    .setTitle('MISSING PERMISSIONS')
                    .setThumbnail(
                        bot.user.avatarURL({
                            format: 'png',
                            dynamic: true,
                            size: 2048,
                        })
                    )
                    .setColor('RED')
                    .setDescription(
                        "You don't have the right permissions to do that. Verify your permissions and try again."
                    )
                    .setTimestamp()
                    .setFooter(bot.user.username, bot.user.avatarURL())
            )
            .catch(error => console.error(error));
};
