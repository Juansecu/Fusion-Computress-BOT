const {
    Client,
    GuildMember,
    MessageEmbed,
    Permissions,
} = require('discord.js');

const { blacklist } = require('../data.json');

/**
 * @param {Client} bot
 * @param {GuildMember} newGuildMember
 */
module.exports = (bot, newGuildMember) => {
    /**
     * Gets the difference between today date and the date when the new guild member account was created in miliseconds.
     */
    const acatDifference =
        new Date().getTime() - newGuildMember.user.createdAt.getTime();
    /**
     * Filters out the blacklist users that have the same ID as the new guild member.
     */
    const blacklistUserIdFilter = blacklist.userIds.filter(
        userId => userId === newGuildMember.id
    );
    /**
     * Filters out the blacklist usernames that are the same as the new guild member.
     */
    const blacklistUsernameFilter = blacklist.usernames.filter(username =>
        newGuildMember.user.username.match(
            new RegExp(
                `${username}|${username.replace(/ +/g, '')}|${username.replace(
                    / +/g,
                    '-'
                )}|${username.replace(/ +/g, '_')}|${username.replace(
                    /:+/g,
                    ''
                )}|${username.replace(/:+/g, ' ')}|${username.replace(
                    /:+/g,
                    '-'
                )}|${username.replace(/:+/g, '_')}`,
                'ig'
            )
        )
    );
    /**
     * Filter all guild members that have a username that contains the new guild member username.
     */
    const altsFilter = newGuildMember.guild.members.cache
        .filter(member =>
            newGuildMember.user.username.match(
                new RegExp(
                    `${member.user.username}|${member.user.username.replace(
                        / +/g,
                        ''
                    )}|${member.user.username.replace(
                        / +/g,
                        '-'
                    )}|${member.user.username.replace(
                        / +/g,
                        '_'
                    )}|${member.user.username.replace(
                        /:+/g,
                        ''
                    )}|${member.user.username.replace(
                        /:+/g,
                        ' '
                    )}|${member.user.username.replace(
                        /:+/g,
                        '-'
                    )}|${member.user.username.replace(/:+/g, '_')}`,
                    'ig'
                )
            )
        )
        .map(member => member);

    if (
        blacklistUserIdFilter.length > 0 ||
        blacklistUsernameFilter.length > 0
    ) {
        if (
            !newGuildMember.guild
                .member(bot.user)
                .hasPermission(new Permissions(371942))
        )
            newGuildMember.guild.owner
                .send(
                    new MessageEmbed()
                        .setAuthor(
                            newGuildMember.guild.owner.user.tag,
                            newGuildMember.guild.owner.user.avatarURL({
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
                            `I just found a new member from your server **${newGuildMember.guild.name}** that is part of the blacklist, but I am authorized to do nothing in this case due I do not have the minimum permissions for my correct operation.\n\nPlease give me the minimum permissions that I need for my correct operation and I will ban the alts that join to your server in the future.`
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                )
                .catch(error => console.error(error));
        else
            newGuildMember
                .ban({
                    reason: 'This user is part of the blacklist.',
                })
                .then(guildMember =>
                    guildMember.guild.owner
                        .send(
                            new MessageEmbed()
                                .setAuthor(
                                    guildMember.guild.owner.user.tag,
                                    guildMember.guild.owner.user.avatarURL()
                                )
                                .setColor(0x008b03)
                                .setTitle('Blacklist User banned')
                                .setThumbnail(
                                    guildMember.user.avatarURL({
                                        format: 'png',
                                        dynamic: true,
                                        size: 2048,
                                    })
                                )
                                .setDescription(
                                    `**Banned member:** <@${guildMember.id}>`
                                )
                                .addFields(
                                    {
                                        name: 'Username:',
                                        value: guildMember.user.username,
                                        inline: true,
                                    },
                                    {
                                        name: 'User Tag:',
                                        value: guildMember.user.discriminator,
                                        inline: true,
                                    },
                                    {
                                        name: 'User ID:',
                                        value: guildMember.id,
                                        inline: true,
                                    },
                                    {
                                        name: 'User Status:',
                                        value: bot.activityStatus(
                                            guildMember.user.presence.status
                                        ),
                                        inline: true,
                                    },
                                    {
                                        name: 'Account created at:',
                                        value: guildMember.user.createdAt,
                                        inline: true,
                                    },
                                    {
                                        name: 'Guild:',
                                        value: guildMember.guild.name,
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
                .catch(error => console.error(error));
    }

    if (altsFilter.length > 0 && acatDifference <= 7776000000) {
        if (
            !newGuildMember.guild
                .member(bot.user)
                .hasPermission(new Permissions(371942))
        )
            newGuildMember.guild.owner
                .send(
                    new MessageEmbed()
                        .setAuthor(
                            newGuildMember.guild.owner.user.tag,
                            newGuildMember.guild.owner.user.avatarURL({
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
                            `I just found a new member from your server **${newGuildMember.guild.name}** that is an alt, but I am authorized to do nothing in this case due I do not have the minimum permissions for my correct operation.\n\nPlease give me the minimum permissions that I need for my correct operation and I will ban the alts that join to your server in the future.`
                        )
                        .setTimestamp()
                        .setFooter(bot.user.username, bot.user.avatarURL())
                )
                .catch(error => console.error(error));
        else
            newGuildMember
                .ban({
                    reason: 'This is an alt account.',
                })
                .then(guildMember =>
                    newGuildMember.guild.owner
                        .send(
                            new MessageEmbed()
                                .setAuthor(
                                    guildMember.guild.owner.user.tag,
                                    guildMember.guild.owner.user.avatarURL()
                                )
                                .setTitle('Alt User banned')
                                .setThumbnail(
                                    guildMember.user.avatarURL({
                                        format: 'png',
                                        dynamic: true,
                                        size: 2048,
                                    })
                                )
                                .setColor(0x008b03)
                                .setDescription(
                                    `**Banned member:** <@${guildMember.id}>`
                                )
                                .addFields(
                                    {
                                        name: 'Username:',
                                        value: guildMember.user.username,
                                        inline: true,
                                    },
                                    {
                                        name: 'User Tag:',
                                        value: guildMember.user.discriminator,
                                        inline: true,
                                    },
                                    {
                                        name: 'User ID:',
                                        value: guildMember.id,
                                        inline: true,
                                    },
                                    {
                                        name: 'User Status:',
                                        value: bot.activityStatus(
                                            guildMember.user.presence.status
                                        ),
                                        inline: true,
                                    },
                                    {
                                        name: 'Account Created At:',
                                        value: guildMember.user.createdAt,
                                        inline: true,
                                    },
                                    {
                                        name: 'Guild:',
                                        value: guildMember.guild.name,
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
                .catch(error => console.error(error));
    }
};
