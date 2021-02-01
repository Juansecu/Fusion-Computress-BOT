const { Client, Message, MessageEmbed, Permissions } = require('discord.js');

const { owner, prefix } = require('../config.json');

const { botInformation, trustedUsers } = require('../data.json');

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array<string>} args
 */
module.exports = (bot, message, args) => {
    // Checks if there are not arguments in the message:
    if (args.length === 0) {
        /**
         * Base for the `MessageEmbed()` that displays all commands that can be used by the author of the message.
         */
        const messageEmbed = new MessageEmbed({
            author: {
                name: message.author.tag,
                icon_url:
                    message.author.avatarURL({
                        dynamic: true,
                    }) || message.author.defaultAvatarURL,
            },
            title: 'Commands',
            thumbnail: {
                url: bot.user.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048,
                }),
            },
            color: 0x008b03,
            description: `**Use:** \`${prefix}<command>\`\n\nFor more help with a command, type \`${prefix}help <command-name>\`.`,
            timestamp: new Date(),
            footer: {
                text: bot.user.username,
                icon_url: bot.user.avatarURL(),
            },
        });

        // Loop through all the BOT commands:
        for (const command of botInformation.commands) {
            /**
             * Commands that can be used by the author of the message.
             */
            const commands = [];

            // Checks if the command does not need permissions to be used:
            if (!command.neededPermissions) {
                if (!command.onlyForTrustedPeople) commands.push(command);
                else {
                    const trustedUser = trustedUsers.filter(
                        tu => tu === message.author.id
                    );
                    trustedUser.length > 0 || message.author.id === owner
                        ? commands.push(command)
                        : 0;
                }
            } else {
                if (
                    message.member.hasPermission(
                        new Permissions(command.neededPermissions)
                    )
                )
                    commands.push(command);
            }

            commands.map(cmd =>
                messageEmbed.addField(
                    `• \`${cmd.name}\`:`,
                    cmd.shortDescription
                )
            );
        }

        if (messageEmbed.fields.length > 0) message.channel.send(messageEmbed);
        else
            message.channel.send(
                messageEmbed
                    .setColor(0x008b03)
                    .setDescription(
                        'Ehh, it looks like you can not use any of my commands. Please try again later.'
                    )
            );
    } else {
        // Loop through all the arguments of the message
        args.forEach(arg => {
            const command = botInformation.commands.filter(
                command => command.name === arg
            );

            if (command.length > 0) {
                command.map(cmd => {
                    if (
                        message.member.hasPermission(
                            new Permissions(cmd.neededPermissions)
                        )
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
                                    .setTitle(`\`${cmd.name}\``)
                                    .setThumbnail(
                                        bot.user.avatarURL({
                                            format: 'png',
                                            dynamic: true,
                                            size: 2048,
                                        })
                                    )
                                    .setColor(0x008b03)
                                    .setDescription(cmd.longDescription)
                                    .setTimestamp()
                                    .setFooter(
                                        bot.user.username,
                                        bot.user.avatarURL()
                                    )
                            )
                            .catch(error => console.error(error));
                    else
                        message.channel.send(
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
                                    `Yo do not have the necessary permissions to use the command \`${cmd.name}\`. Please try again later.`
                                )
                                .setTimestamp()
                                .setFooter(
                                    bot.user.username,
                                    bot.user.avatarURL()
                                )
                        );
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
                            .setTitle('INVALID ARGUMENT')
                            .setThumbnail(
                                bot.user.avatarURL({
                                    format: 'png',
                                    dynamic: true,
                                    size: 2048,
                                })
                            )
                            .setColor('RED')
                            .setDescription(
                                `The command \`${arg}\` does not exist. Please verify the name of the command that you want to know more about and try again.`
                            )
                            .setTimestamp()
                            .setFooter(bot.user.username, bot.user.avatarURL())
                    )
                    .catch(error => console.error(error));
        });
    }
};
