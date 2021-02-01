const {
    Client,
    Guild,
    MessageEmbed,
    Permissions,
    User,
} = require('discord.js');

/**
 * @param {Client} bot
 * @param {Guild} guild
 * @param {User} user
 */
module.exports = (bot, guild, user) => {
    if (!guild.member(bot.user).hasPermission(new Permissions(371942)))
        guild.owner.send(
            new MessageEmbed()
                .setAuthor(guild.owner.user.tag, guild.owner.user.avatarURL())
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
                    `<@${guild.owner.id}> I do not have the minimun permissions for my correct operation in your server **${guild.name}**. You must give me these permissions if you wish to use my services.\n\n*This data is collected solely by my creator for the sole purpose of improving me.*`
                )
                .setTimestamp()
                .setFooter(bot.user.username, bot.user.avatarURL())
        );
    else
        guild.fetchAuditLogs().then(logs => {
            const auditLog = logs.entries.first();
            const moderator = auditLog.executor;
            const banReason = auditLog.reason;

            bot.channels.cache
                .get('798435692794347520')
                .send(
                    new MessageEmbed()
                        .setAuthor(
                            moderator.tag || guild.name,
                            moderator.avatarURL() || guild.iconURL()
                        )
                        .setTitle('Member banned')
                        .setThumbnail(
                            user.avatarURL({
                                format: 'png',
                                dynamic: true,
                                size: 2048,
                            })
                        )
                        .setColor(0x008b03)
                        .setDescription(
                            `<@${user.id}> was banned from the server **${guild.name}** with id **${guild.id}**.\n\n**Reason:** ${banReason}`
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
                            { name: 'User ID:', value: user.id, inline: true },
                            {
                                name: 'User Status:',
                                value: bot.activityStatus(user.presence.status),
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
                        .setFooter(bot.user.username, bot.user.avatarURL())
                )
                .catch(error => console.error(error));
        });
};
