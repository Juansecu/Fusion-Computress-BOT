const { Client, Message, MessageEmbed, Permissions } = require('discord.js');

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array<string>} args
 */
module.exports = async (bot, message, args) => {
    message.delete();

    if (args.length > 0) {
        args.forEach(async arg => {
            switch (arg) {
                case 'admin':
                    bot.generateInvite({
                        permissions: new Permissions(8),
                    })
                        .then(invitationLink =>
                            message.author
                                .send(
                                    new MessageEmbed()
                                        .setAuthor(
                                            message.author.tag,
                                            message.author.avatarURL({
                                                dynamic: true,
                                            })
                                        )
                                        .setTitle('Administrator permissions')
                                        .setThumbnail(
                                            bot.user.avatarURL({
                                                format: 'png',
                                                dynamic: true,
                                                size: 2048,
                                            })
                                        )
                                        .setColor(0x008b03)
                                        .setDescription(
                                            `**Here you have:** ${invitationLink}`
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
                        .catch(error => {
                            console.error(error);
                            message.channel.send(
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
                                        `I have found an error while I was trying to generate the invitation link for you:\n\n${error}`
                                    )
                                    .setTimestamp()
                                    .setFooter(
                                        bot.user.username,
                                        bot.user.avatarURL()
                                    )
                            );
                        });
                    break;
                case 'omf':
                    bot.generateInvite({
                        permissions: new Permissions(371942),
                    })
                        .then(invitationLink =>
                            message.author
                                .send(
                                    new MessageEmbed()
                                        .setAuthor(
                                            message.author.tag,
                                            message.author.avatarURL({
                                                dynamic: true,
                                            })
                                        )
                                        .setTitle(
                                            'Needed permissions for main features'
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
                                            `**Here you have:** ${invitationLink}`
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
                        .catch(error => {
                            console.error(error);
                            message.channel.send(
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
                                        `I have found an error while I was trying to generate the invitation link for you:\n\n${error}`
                                    )
                                    .setTimestamp()
                                    .setFooter(
                                        bot.user.username,
                                        bot.user.avatarURL()
                                    )
                            );
                        });
                    break;
                case 'af':
                    bot.generateInvite({
                        permissions: new Permissions(29732070),
                    })
                        .then(invitationLink =>
                            message.author
                                .send(
                                    new MessageEmbed()
                                        .setAuthor(
                                            message.author.tag,
                                            message.author.avatarURL({
                                                dynamic: true,
                                            })
                                        )
                                        .setTitle(
                                            'Needed permissions for all features'
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
                                            `**Here you have:** ${invitationLink}`
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
                        .catch(error => {
                            console.error(error);
                            message.channel.send(
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
                                        `I have found an error while I was trying to generate the invitation link for you:\n\n${error}`
                                    )
                                    .setTimestamp()
                                    .setFooter(
                                        bot.user.username,
                                        bot.user.avatarURL()
                                    )
                            );
                        });
                    break;
                default:
                    message.channel
                        .send(
                            new MessageEmbed()
                                .setAuthor(
                                    message.author.tag,
                                    message.author.avatarURL({
                                        dynamic: true,
                                    })
                                )
                                .setTitle('FALSY ARGUMENT')
                                .setThumbnail(
                                    bot.user.avatarURL({
                                        format: 'png',
                                        dynamic: true,
                                        size: 2048,
                                    })
                                )
                                .setColor('RED')
                                .setDescription(
                                    `**You have typed a false argument:** \`${arg}\`\n\nPlease verify your argument and try again.`
                                )
                                .setTimestamp()
                                .setFooter(
                                    bot.user.username,
                                    bot.user.avatarURL()
                                )
                        )
                        .catch(error => console.error(error));
            }
        });
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
                    .setTitle('MISSING ARGUMENT')
                    .setThumbnail(
                        bot.user.avatarURL({
                            format: 'png',
                            dynamic: true,
                            size: 2048,
                        })
                    )
                    .setColor('RED')
                    .setDescription(
                        'You have not typed any argument. You must type a valid argument, so I will be able to generate an invite and send it to you by direct message.'
                    )
                    .setTimestamp()
                    .setFooter(bot.user.username, bot.user.avatarURL())
            )
            .catch(error => console.error(error));
};
