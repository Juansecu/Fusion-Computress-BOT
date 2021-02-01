const { Client, MessageEmbed, Permissions } = require('discord.js');

const { prefix } = require('../config.json');

const { blacklist } = require('../data.json');

/**
 * @param {Client} bot
 */
module.exports = bot => {
    bot.user.setPresence({
        status: 'dnd',
        activity: {
            name: `${prefix}help | ${
                bot.guilds.cache.map(guild => guild).length
            } servers`,
            type: 'LISTENING',
        },
    });

    bot.guilds.cache.forEach(guild => {
        blacklist.userIds.filter(userId =>
            guild.members.cache
                .filter(guildMember => guildMember.user.id === userId)
                .map(guildMember => {
                    if (
                        guild
                            .member(bot.user)
                            .hasPermission(new Permissions(371942))
                    )
                        guildMember
                            .ban({
                                reason: 'This user is part of the blacklist.',
                            })
                            .then(() =>
                                guild.owner
                                    .send(
                                        new MessageEmbed()
                                            .setAuthor(
                                                guild.owner.user.tag,
                                                guild.owner.user.avatarURL({
                                                    dynamic: true,
                                                })
                                            )
                                            .setTitle('Member banned')
                                            .setThumbnail(
                                                guildMember.user.avatarURL({
                                                    format: 'png',
                                                    dynamic: true,
                                                    size: 2048,
                                                })
                                            )
                                            .setColor(0x008b03)
                                            .setDescription(
                                                `I've found the member <@${guildMember.id}> from your guild **${guild.name}**, who is part of the blacklist. Here you have the details from this user:`
                                            )
                                            .addFields(
                                                {
                                                    name: 'Username:',
                                                    value:
                                                        guildMember.user
                                                            .username,
                                                    inline: true,
                                                },
                                                {
                                                    name: 'User Tag:',
                                                    value:
                                                        guildMember.user
                                                            .discriminator,
                                                    inline: true,
                                                },
                                                {
                                                    name: 'User ID:',
                                                    value: guildMember.user.id,
                                                    inline: true,
                                                },
                                                {
                                                    name: 'User Status:',
                                                    value: bot.activityStatus(
                                                        guildMember.presence
                                                            .status
                                                    ),
                                                    inline: true,
                                                },
                                                {
                                                    name: 'User Activities:',
                                                    value: guildMember.user.presence.activities.forEach(
                                                        activity =>
                                                            activity.name.split(
                                                                '\n'
                                                            )
                                                    ),
                                                    inline: true,
                                                },
                                                {
                                                    name: 'Account Created At:',
                                                    value:
                                                        guildMember.user
                                                            .createdAt,
                                                    inline: true,
                                                },
                                                {
                                                    name:
                                                        "Server's Member Since:",
                                                    value: guildMember.joinedAt,
                                                    inline: true,
                                                }
                                            )
                                            .setTimestamp()
                                            .setFooter(
                                                bot.user.username,
                                                bot.user.avatarURL()
                                            )
                                    )
                                    .then(() =>
                                        console.log(
                                            'Message sent successfully!'
                                        )
                                    )
                                    .catch(error => console.error(error))
                            )
                            .catch(error => console.error(error));
                    else
                        guild.owner
                            .send(
                                new MessageEmbed()
                                    .setAuthor(
                                        guild.owner.user.tag,
                                        guild.owner.user.avatarURL({
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
                                        `I have found the member <@${guildMember.id}> from your guild **${guild.name}**, who is part of the blacklist, but I cannot ban them because I do not have the necessary permissions for the correct work of my main features from your guild, so I am authorized to do nothing in this case.\n\nIf you wish to use my services, I need you give me the all minimum permissions for my correct functioning.`
                                    )
                                    .setTimestamp()
                                    .setFooter(
                                        bot.user.username,
                                        bot.user.avatarURL()
                                    )
                            )
                            .catch(error => console.error(error));
                })
        );
    });
};
