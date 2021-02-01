const { Client, Message, MessageEmbed, Permissions } = require('discord.js');

const { prefix } = require('../config.json');

const { blacklist, legitimateProjects } = require('../data.json');

/**
 * @param {Client} bot
 * @param {Message} message
 */
module.exports = (bot, message) => {
    /*if (message.content.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)) message.delete({
        reason: 'It contents a link of a part of Internet with malicious purposes.'
    });*/

    // Verifies if the channel is a DMChannel:
    if (message.channel.type === 'dm') {
        if (message.author.id === bot.user.id) return;
        else
            bot.channels.cache
                .get('798435692794347520')
                .send(
                    new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({
                                dynamic: true,
                            }) || message.author.defaultAvatarURL
                        )
                        .setTitle('New private message')
                        .setThumbnail(
                            message.author.avatarURL({
                                format: 'png',
                                dynamic: true,
                                size: 2048,
                            }) || message.author.defaultAvatarURL
                        )
                        .setColor(0x008b03)
                        .setDescription(`**Message:** ${message.content}`)
                        .addFields(
                            {
                                name: 'DMChannel With:',
                                value: `<@${message.channel.recipient.id}>`,
                                inline: true,
                            },
                            {
                                name: 'Channel Type:',
                                value: message.channel.type,
                                inline: true,
                            },
                            {
                                name: 'Channel ID:',
                                value: message.channel.id,
                                inline: true,
                            },
                            {
                                name: 'Author Username:',
                                value: message.author.username,
                                inline: true,
                            },
                            {
                                name: 'Author Tag:',
                                value: message.author.discriminator,
                                inline: true,
                            },
                            {
                                name: 'Author ID:',
                                value: message.author.id,
                                inline: true,
                            },
                            {
                                name: 'Author Status:',
                                value: bot.activityStatus(
                                    message.author.presence.status
                                ),
                                inline: true,
                            },
                            {
                                name:
                                    message.author.presence.activities.length >
                                    1
                                        ? 'Author Activities:'
                                        : 'Author Activity:',
                                value:
                                    message.author.presence.activities.length >
                                    0
                                        ? message.author.presence.activities.map(
                                              activity => activity.name
                                          )
                                        : 'None',
                                inline: true,
                            },
                            {
                                name: 'Author Account Created At:',
                                value: message.author.createdAt,
                                inline: true,
                            },
                            {
                                name:
                                    bot.guilds.cache
                                        .filter(
                                            guild =>
                                                guild.owner.user.id ===
                                                message.author.id
                                        )
                                        .map(guild => guild).length > 1
                                        ? "Author's Server Names:"
                                        : "Author's Server Name:",
                                value:
                                    bot.guilds.cache
                                        .filter(
                                            guild =>
                                                guild.owner.user.id ===
                                                message.author.id
                                        )
                                        .map(guild => guild).length > 0
                                        ? bot.guilds.cache
                                              .filter(
                                                  guild =>
                                                      guild.owner.user.id ===
                                                      message.author.id
                                              )
                                              .map(guild => guild.name)
                                        : 'None',
                                inline: true,
                            },
                            {
                                name:
                                    bot.guilds.cache
                                        .filter(
                                            guild =>
                                                guild.owner.user.id ===
                                                message.author.id
                                        )
                                        .map(guild => guild).length > 1
                                        ? "Author's Server Regions:"
                                        : "Author's Server Region:",
                                value:
                                    bot.guilds.cache
                                        .filter(
                                            guild =>
                                                guild.owner.user.id ===
                                                message.author.id
                                        )
                                        .map(guild => guild).length > 0
                                        ? bot.guilds.cache
                                              .filter(
                                                  guild =>
                                                      guild.owner.user.id ===
                                                      message.author.id
                                              )
                                              .map(guild => guild.region)
                                        : 'None',
                                inline: true,
                            },
                            {
                                name:
                                    bot.guilds.cache
                                        .filter(
                                            guild =>
                                                guild.owner.user.id ===
                                                message.author.id
                                        )
                                        .map(guild => guild).length > 1
                                        ? "Author's Server IDs:"
                                        : "Author's Server ID:",
                                value:
                                    bot.guilds.cache
                                        .filter(
                                            guild =>
                                                guild.owner.user.id ===
                                                message.author.id
                                        )
                                        .map(guild => guild).length > 0
                                        ? bot.guilds.cache
                                              .filter(
                                                  guild =>
                                                      guild.owner.user.id ===
                                                      message.author.id
                                              )
                                              .map(guild => guild.id)
                                        : 'None',
                                inline: true,
                            },
                            {
                                name: "Author's Server Members:",
                                value:
                                    bot.guilds.cache
                                        .filter(
                                            guild =>
                                                guild.owner.user.id ===
                                                message.author.id
                                        )
                                        .map(guild => guild).length > 0
                                        ? bot.guilds.cache
                                              .filter(
                                                  guild =>
                                                      guild.owner.user.id ===
                                                      message.author.id
                                              )
                                              .map(guild => guild.memberCount)
                                        : 'None',
                                inline: true,
                            },
                            {
                                name: "Author's Servers Created At:",
                                value:
                                    bot.guilds.cache
                                        .filter(
                                            guild =>
                                                guild.owner.user.id ===
                                                message.author.id
                                        )
                                        .map(guild => guild).length > 0
                                        ? bot.guilds.cache
                                              .filter(
                                                  guild =>
                                                      guild.owner.user.id ===
                                                      message.author.id
                                              )
                                              .map(guild => guild.createdAt)
                                        : 'None',
                                inline: true,
                            }
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                )
                .catch(error => console.error(error));
    } else {
        // Verifies if the BOT has the minimum permissions to its correct operation:
        if (
            message.guild
                .member(bot.user)
                .hasPermission(new Permissions(371942)) ||
            message.guild.member(bot.user).hasPermission('ADMINISTRATOR')
        ) {
            /**
             * @description Filter links to Malorn twitter accounts.
             */
            const malornAlts = blacklist.malornTwitterAccounts.filter(mta =>
                message.content.match(
                    new RegExp(
                        `((https?:\/\/)?(www\.)?)([A-Z0-9]{1,}\.)?[A-Z0-9]{1,}\.[A-Z0-9]{2,5}(\.[A-Z0-9]{2,5})?\/(@?${mta}|${mta.replace(
                            / +/g,
                            '-'
                        )}|${mta.replace(/ +/g, '_')}|${mta.replace(
                            /:+/g,
                            ''
                        )}|${mta.replace(/:+/g, ' ')}|${mta.replace(
                            /:+/g,
                            '-'
                        )}|${mta.replace(
                            /:+/g,
                            '_'
                        )})|((r\/)?${mta}|${mta.replace(
                            / +/g,
                            '-'
                        )}|${mta.replace(/ +/g, '_')}|${mta.replace(
                            /:+/g,
                            ''
                        )}|${mta.replace(/:+/g, ' ')}|${mta.replace(
                            /:+/g,
                            '-'
                        )}|${mta.replace(/:+/g, '_')})`,
                        'ig'
                    )
                )
            );
            /**
             * @description Filter links to fake social media of legitimate projects.
             */
            const spam = legitimateProjects.filter(lp => {
                const lpoosmFilter = lp.otherOfficialSocialMedia.filter(oosm =>
                    message.content.match(new RegExp(oosm, 'ig'))
                );

                if (lpoosmFilter.length > 0) return;
                else
                    return message.content.match(
                        new RegExp(
                            `((https?:\/\/)?(www\.)?)([A-Z0-9]{1,}\.)?[A-Z0-9]{1,}\.[A-Z0-9]{2,5}(\.[A-Z0-9]{2,5})?\/(@?${
                                lp.name
                            }|${lp.name.replace(/ +/g, '')}|${lp.name.replace(
                                / +/g,
                                '-'
                            )}|${lp.name.replace(/ +/g, '_')}|${lp.name.replace(
                                /:+/g,
                                ''
                            )}|${lp.name.replace(/:+/g, ' ')}|${lp.name.replace(
                                /:+/g,
                                '-'
                            )}|${lp.name.replace(/:+/g, '_')})|((r\/)?${
                                lp.name
                            }|${lp.name.replace(/ +/g, '')}|${lp.name.replace(
                                / +/g,
                                '-'
                            )}|${lp.name.replace(/ +/g, '_')}|${lp.name.replace(
                                /:+/g,
                                ''
                            )}|${lp.name.replace(/:+/g, ' ')}|${lp.name.replace(
                                /:+/g,
                                '-'
                            )}|${lp.name.replace(/:+/g, '_')})`,
                            'ig'
                        )
                    );
            });

            /*if (malornAlts.length > 0 /* || spam.length > 0*)
                message
                    .delete({
                        reason: 'A spam message.',
                    })
                    .then(msg => {
                        /*msg.member
                    .ban({
                        reason: 'A spam message.',
                    })
                    .then(messageAuthor =>
                        msg.channel
                            .send(
                                new MessageEmbed()
                                    .setAuthor(
                                        msg.guild.owner.user.tag,
                                        msg.guild.owner.user.avatarURL()
                                    )
                                    .setTitle(
                                        `User banned from ${msg.guild.name}`
                                    )
                                    .setThumbnail(
                                        msg.author.avatarURL({
                                            format: 'png',
                                            dynamic: true,
                                            size: 2048
                                        })
                                    )
                                    .setColor(0x008b03)
                                    .setDescription(
                                        `I've banned the User <@${messageAuthor.id}> after they sent a spam message. Here is the respective information:\n\n**Message:**\n${msg.content}`
                                    )
                                    .addFields(
                                        {
                                            name: 'Username:',
                                            value: messageAuthor.username,
                                            inline: true
                                        },
                                        {
                                            name: 'Tag:',
                                            value: messageAuthor.tag,
                                            inline: true
                                        },
                                        {
                                            name: 'User ID:',
                                            value: messageAuthor.id,
                                            inline: true
                                        },
                                        {
                                            name: 'User Presense:',
                                            value: bot.activityStatus(
                                                messageAuthor.presence.status
                                            ),
                                            inline: true
                                        },
                                        {
                                            name: 'Account Created At:',
                                            value: messageAuthor.createdAt,
                                            inline: true
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
                    .catch(error => console.error(error));*

                        bot.channels.cache
                            .get('798435692794347520')
                            .send(
                                new MessageEmbed()
                                    .setAuthor(
                                        msg.author.tag,
                                        msg.author.avatarURL({
                                            dynamic: true,
                                        }) || msg.author.defaultAvatarURL
                                    )
                                    .setTitle('Spam message deleted')
                                    .setThumbnail(
                                        msg.author.avatarURL({
                                            format: 'png',
                                            dynamic: true,
                                            size: 2048,
                                        }) || msg.author.defaultAvatarURL
                                    )
                                    .setColor(0x008b03)
                                    .setDescription(
                                        `**Message:** ${msg.content}`
                                    )
                                    .addFields(
                                        {
                                            name: 'Channel Name:',
                                            value: msg.channel.name,
                                            inline: true,
                                        },
                                        {
                                            name: 'Channel Type:',
                                            value: msg.channel.type,
                                            inline: true,
                                        },
                                        {
                                            name: 'Channel ID:',
                                            value: msg.channel.id,
                                            inline: true,
                                        },
                                        {
                                            name: 'Author Username:',
                                            value: msg.author.username,
                                            inline: true,
                                        },
                                        {
                                            name: 'Author Tag:',
                                            value: msg.author.discriminator,
                                            inline: true,
                                        },
                                        {
                                            name: 'Author ID:',
                                            value: msg.author.id,
                                            inline: true,
                                        },
                                        {
                                            name: 'Author Status:',
                                            value: bot.activityStatus(
                                                msg.author.presence.status
                                            ),
                                            inline: true,
                                        },
                                        {
                                            name:
                                                msg.author.presence.activities
                                                    .length > 1
                                                    ? 'Author Activities:'
                                                    : 'Author Activity:',
                                            value:
                                                msg.author.presence.activities
                                                    .length > 0
                                                    ? msg.author.presence.activities.map(
                                                          activity =>
                                                              activity.name
                                                      )
                                                    : 'None',
                                            inline: true,
                                        },
                                        {
                                            name: 'Author Account Created At:',
                                            value: msg.author.createdAt,
                                            inline: true,
                                        },
                                        {
                                            name: 'Server Name:',
                                            value: msg.guild
                                                ? msg.guild.name
                                                : 'Null',
                                            inline: true,
                                        },
                                        {
                                            name: 'Server Region:',
                                            value: msg.guild
                                                ? msg.guild.region
                                                : 'Null',
                                            inline: true,
                                        },
                                        {
                                            name: 'Server ID:',
                                            value: msg.guild
                                                ? msg.guild.id
                                                : 'Null',
                                            inline: true,
                                        },
                                        {
                                            name: 'Server Members:',
                                            value: msg.guild
                                                ? msg.guild.memberCount
                                                : 'Null',
                                            inline: true,
                                        },
                                        {
                                            name: 'Server Created At:',
                                            value: msg.guild
                                                ? msg.guild.createdAt
                                                : 'Null',
                                            inline: true,
                                        },
                                        {
                                            name: 'Server Owner:',
                                            value: msg.guild
                                                ? `<@${msg.guild.owner.user.id}>`
                                                : 'Null',
                                            inline: true,
                                        },
                                        {
                                            name:
                                                bot.guilds.cache
                                                    .filter(
                                                        guild =>
                                                            guild.owner.user
                                                                .id ===
                                                            msg.author.id
                                                    )
                                                    .map(guild => guild)
                                                    .length > 1
                                                    ? "Author's Server Names:"
                                                    : "Author's Server Name:",
                                            value:
                                                bot.guilds.cache
                                                    .filter(
                                                        guild =>
                                                            guild.owner.user
                                                                .id ===
                                                            msg.author.id
                                                    )
                                                    .map(guild => guild)
                                                    .length > 0
                                                    ? bot.guilds.cache
                                                          .filter(
                                                              guild =>
                                                                  guild.owner
                                                                      .user
                                                                      .id ===
                                                                  msg.author.id
                                                          )
                                                          .map(
                                                              guild =>
                                                                  guild.name
                                                          )
                                                    : 'None',
                                            inline: true,
                                        },
                                        {
                                            name:
                                                bot.guilds.cache
                                                    .filter(
                                                        guild =>
                                                            guild.owner.user
                                                                .id ===
                                                            msg.author.id
                                                    )
                                                    .map(guild => guild)
                                                    .length > 1
                                                    ? "Author's Server Regions:"
                                                    : "Author's Server Region:",
                                            value:
                                                bot.guilds.cache
                                                    .filter(
                                                        guild =>
                                                            guild.owner.user
                                                                .id ===
                                                            msg.author.id
                                                    )
                                                    .map(guild => guild)
                                                    .length > 0
                                                    ? bot.guilds.cache
                                                          .filter(
                                                              guild =>
                                                                  guild.owner
                                                                      .user
                                                                      .id ===
                                                                  msg.author.id
                                                          )
                                                          .map(
                                                              guild =>
                                                                  guild.region
                                                          )
                                                    : 'None',
                                            inline: true,
                                        },
                                        {
                                            name:
                                                bot.guilds.cache
                                                    .filter(
                                                        guild =>
                                                            guild.owner.user
                                                                .id ===
                                                            msg.author.id
                                                    )
                                                    .map(guild => guild)
                                                    .length > 1
                                                    ? "Author's Server IDs:"
                                                    : "Author's Server ID:",
                                            value:
                                                bot.guilds.cache
                                                    .filter(
                                                        guild =>
                                                            guild.owner.user
                                                                .id ===
                                                            msg.author.id
                                                    )
                                                    .map(guild => guild)
                                                    .length > 0
                                                    ? bot.guilds.cache
                                                          .filter(
                                                              guild =>
                                                                  guild.owner
                                                                      .user
                                                                      .id ===
                                                                  msg.author.id
                                                          )
                                                          .map(
                                                              guild => guild.id
                                                          )
                                                    : 'None',
                                            inline: true,
                                        },
                                        {
                                            name: "Author's Server Members:",
                                            value:
                                                bot.guilds.cache
                                                    .filter(
                                                        guild =>
                                                            guild.owner.user
                                                                .id ===
                                                            msg.author.id
                                                    )
                                                    .map(guild => guild)
                                                    .length > 0
                                                    ? bot.guilds.cache
                                                          .filter(
                                                              guild =>
                                                                  guild.owner
                                                                      .user
                                                                      .id ===
                                                                  msg.author.id
                                                          )
                                                          .map(
                                                              guild =>
                                                                  guild.memberCount
                                                          )
                                                    : 'None',
                                            inline: true,
                                        },
                                        {
                                            name:
                                                "Author's Servers Created At:",
                                            value:
                                                bot.guilds.cache
                                                    .filter(
                                                        guild =>
                                                            guild.owner.user
                                                                .id ===
                                                            msg.author.id
                                                    )
                                                    .map(guild => guild)
                                                    .length > 0
                                                    ? bot.guilds.cache
                                                          .filter(
                                                              guild =>
                                                                  guild.owner
                                                                      .user
                                                                      .id ===
                                                                  msg.author.id
                                                          )
                                                          .map(
                                                              guild =>
                                                                  guild.createdAt
                                                          )
                                                    : 'None',
                                            inline: true,
                                        }
                                    )
                            )
                            .catch(error => console.error(error));
                    })
                    .catch(error => console.error(error));*/

            // Commands & args settings:
            if (message.author.bot) return;

            const args = message.content
                .slice(prefix.length)
                .trim()
                .split(/ +/g);
            const command = args.shift().toLowerCase();
            const cmd = bot.commands.get(command);

            if (!cmd) return;

            cmd(bot, message, args);
        } else {
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
                        .setDescription(
                            "I don't have the minimum permissions for my main features, so I am not authorized to execute any action in this server."
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                )
                .catch(error => console.error(error));
        }
    }
};
