const { Client, Message, MessageEmbed } = require('discord.js');

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array<string>} args
 */
module.exports = (bot, message, args) => {
    // Checks if the BOT can deafen members in the guild:
    if (message.guild.member(bot.user).hasPermission('DEAFEN_MEMBERS')) {
        // Checks if the author of the message can deafen members in the guild:
        if (
            message.guild.member(message.author).hasPermission('DEAFEN_MEMBERS')
        ) {
            // Checks if there are not arguments in the message:
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
                                'You have not typed any argument. Please type the minimum arguments and try again.'
                            )
                            .setTimestamp()
                            .setFooter(bot.user.username, bot.user.avatarURL())
                    )
                    .catch(error => console.error(error));
            else {
                if (args[0].match(/^(<@)/)) {
                    const member = message.mentions.members.first();

                    if (member) {
                        if (!member.voice.channel)
                            message.channel
                                .send(
                                    new MessageEmbed()
                                        .setAuthor(
                                            message.author.tag,
                                            message.author.avatarURL({
                                                dynamic: true,
                                            })
                                        )
                                        .setTitle('MISSING VOICE CHANNEL')
                                        .setThumbnail(
                                            bot.user.avatarURL({
                                                format: 'png',
                                                dynamic: true,
                                                size: 2048,
                                            })
                                        )
                                        .setColor('RED')
                                        .setDescription(
                                            `The user <@${member.user.id}> is not connected in a voice channel. Please try again later.`
                                        )
                                        .setTimestamp()
                                        .setFooter(
                                            bot.user.username,
                                            bot.user.avatarURL()
                                        )
                                )
                                .catch(error => console.error(error));
                        else {
                            if (
                                member.voice.channel
                                    .permissionsFor(bot.user)
                                    .has('DEAFEN_MEMBERS')
                            ) {
                                if (!member.voice.deaf) {
                                    if (args.length > 1) {
                                        const reason = args
                                            .slice(1)
                                            .toString()
                                            .replace(/,/g, ' ');

                                        member.voice
                                            .setDeaf(true, reason)
                                            .then(() =>
                                                message.channel
                                                    .send(
                                                        new MessageEmbed()
                                                            .setAuthor(
                                                                message.author
                                                                    .tag,
                                                                message.author.avatarURL(
                                                                    {
                                                                        dynamic: true,
                                                                    }
                                                                )
                                                            )
                                                            .setTitle(
                                                                'Member deafened'
                                                            )
                                                            .setThumbnail(
                                                                bot.user.avatarURL(
                                                                    {
                                                                        format:
                                                                            'png',
                                                                        dynamic: true,
                                                                        size: 2048,
                                                                    }
                                                                )
                                                            )
                                                            .setColor(0x008b03)
                                                            .setDescription(
                                                                `<@${member.id}> has been successfully deafended from the entire server.\n\n**Reason:** \`${reason}\``
                                                            )
                                                            .setTimestamp()
                                                            .setFooter(
                                                                bot.user
                                                                    .username,
                                                                bot.user.avatarURL()
                                                            )
                                                    )
                                                    .catch(error =>
                                                        console.error(error)
                                                    )
                                            )
                                            .catch(error => {
                                                for (const property in error) {
                                                    message.channel.send(
                                                        `**${property}:** ${error[property]}`
                                                    );
                                                }
                                            });
                                    } else
                                        member.voice.setDeaf(true).then(() =>
                                            message.channel
                                                .send(
                                                    new MessageEmbed()
                                                        .setAuthor(
                                                            message.author.tag,
                                                            message.author.avatarURL(
                                                                {
                                                                    dynamic: true,
                                                                }
                                                            )
                                                        )
                                                        .setTitle(
                                                            'Member deafened'
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
                                                            `<@${member.id}> has been successfully deafended from the entire server.`
                                                        )
                                                        .setTimestamp()
                                                        .setFooter(
                                                            bot.user.username,
                                                            bot.user.avatarURL()
                                                        )
                                                )
                                                .catch(error =>
                                                    console.error(error)
                                                )
                                        );
                                } else {
                                    if (args.length > 1) {
                                    } else
                                        member.voice
                                            .setDeaf(false)
                                            .then(() =>
                                                message.channel
                                                    .send(
                                                        new MessageEmbed()
                                                            .setAuthor(
                                                                message.author
                                                                    .tag,
                                                                message.author.avatarURL(
                                                                    {
                                                                        dynamic: true,
                                                                    }
                                                                )
                                                            )
                                                            .setTitle(
                                                                'Member undeafened'
                                                            )
                                                            .setThumbnail(
                                                                bot.user.avatarURL(
                                                                    {
                                                                        format:
                                                                            'png',
                                                                        dynamic: true,
                                                                        size: 2048,
                                                                    }
                                                                )
                                                            )
                                                            .setColor(0x008b03)
                                                            .setDescription(
                                                                `<@${member.id}> has been successfully undeafended from the entire server.`
                                                            )
                                                            .setTimestamp()
                                                            .setFooter(
                                                                bot.user
                                                                    .username,
                                                                bot.user.avatarURL()
                                                            )
                                                    )
                                                    .catch(error =>
                                                        console.error(error)
                                                    )
                                            )
                                            .catch(error =>
                                                console.error(error)
                                            );
                                }
                            } else {
                                const missingChannelPermissionME = new MessageEmbed()
                                    .setAuthor(
                                        message.author.tag,
                                        message.author.avatarURL({
                                            dynamic: true,
                                        })
                                    )
                                    .setTitle('MISSING PERMISSION')
                                    .setThumbnail(
                                        bot.user.avatarURL({
                                            format: 'png',
                                            dynamic: true,
                                            size: 2048,
                                        })
                                    )
                                    .setColor('RED')
                                    .setTimestamp()
                                    .setFooter(
                                        bot.user.username,
                                        bot.user.avatarURL()
                                    );

                                if (
                                    message.member.hasPermission(
                                        'ADMINISTRATOR'
                                    ) ||
                                    message.author.id ===
                                        message.guild.owner.user.id
                                )
                                    missingChannelPermissionME.setDescription(
                                        `I can not deafen/undeafen members connected in the voice channel **${member.voice.channel.name}**.\n\nPlease give me the deafen members permission in this channel and try again.`
                                    );
                                else
                                    missingChannelPermissionME.setDescription(
                                        `I can not deafen/undeafen members connected in the voice channel **${member.voice.channel.name}**.\n\nPlease try again later.`
                                    );

                                message.channel
                                    .send(missingChannelPermissionME)
                                    .catch(error => console.error(error));
                            }
                        }
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
                                    .setTitle('INVALID USER')
                                    .setThumbnail(
                                        bot.user.avatarURL({
                                            format: 'png',
                                            dynamic: true,
                                            size: 2048,
                                        })
                                    )
                                    .setColor('RED')
                                    .setDescription(
                                        `You have not mentioned a valid user. Please mention a valid user and try again.\n\n**Mention:** ${args[0]}`
                                    )
                                    .setTimestamp()
                                    .setFooter(
                                        bot.user.username,
                                        bot.user.avatarURL()
                                    )
                            )
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
                                    'You have not mentioned a user to deafen/undeafen the right way. Please mention a user in the correct way and try again.'
                                )
                                .setTimestamp()
                                .setFooter(
                                    bot.user.username,
                                    bot.user.avatarURL()
                                )
                        )
                        .catch(error => console.error(error));
            }
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
                        .setTitle('MISSING PERMISSION')
                        .setThumbnail(
                            bot.user.avatarURL({
                                format: 'png',
                                dynamic: true,
                                size: 2048,
                            })
                        )
                        .setColor('RED')
                        .setDescription(
                            'You can not deafen/undeafen members because you do not have that permission. Please try again later.'
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                )
                .catch(error => console.error(error));
    } else {
        if (
            message.member.hasPermission('ADMINISTRATOR') ||
            message.member.user.id === message.guild.owner.user.id
        )
            message.channel
                .send(
                    new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({
                                dynamic: true,
                            })
                        )
                        .setTitle('MISSING PERMISSION')
                        .setThumbnail(
                            bot.user.avatarURL({
                                format: 'png',
                                dynamic: true,
                                size: 2048,
                            })
                        )
                        .setColor('RED')
                        .setDescription(
                            'Sorry. I can not deafen members because I do not have that permission. Please give me that permission and try again.'
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                )
                .catch(error => console.error(error));
        else
            message.channel
                .send(
                    new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({
                                dynamic: true,
                            })
                        )
                        .setTitle('MISSING PERMISSION')
                        .setThumbnail(
                            bot.user.avatarURL({
                                format: 'png',
                                dynamic: true,
                                size: 2048,
                            })
                        )
                        .setColor('RED')
                        .setDescription(
                            'Sorry. I can not deafen members because I do not have that permission. Please try again later.'
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                )
                .catch(error => console.error(error));
    }
};
