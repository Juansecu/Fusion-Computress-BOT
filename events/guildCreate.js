const { Client, Guild, MessageEmbed } = require('discord.js');

const { prefix } = require('../config.json');

/**
 * @param {Client} bot
 * @param {Guild} guild
 */
module.exports = async (bot, guild) => {
    bot.user.setPresence({
        status: 'dnd',
        activity: {
            name: `${prefix}help | ${
                bot.guilds.cache.map(guild => guild).length
            } servers`,
            type: 'LISTENING',
        },
    });

    if (guild.member(bot.user).hasPermission('MANAGE_GUILD'))
        await guild
            .fetchIntegrations({ includeApplications: true })
            .then(integrations =>
                integrations
                    .filter(
                        integration => integration.name === bot.user.username
                    )
                    .map(integration =>
                        bot.channels.cache
                            .get('798435692794347520')
                            .send(
                                new MessageEmbed()
                                    .setAuthor(
                                        guild.owner.user.tag,
                                        guild.owner.user.avatarURL({
                                            dynamic: true,
                                        })
                                    )
                                    .setTitle('New guild')
                                    .setThumbnail(
                                        guild.iconURL({
                                            format: 'png',
                                            dynamic: true,
                                            size: 2048,
                                        })
                                    )
                                    .setColor(0x008b03)
                                    .setDescription(
                                        'I have been added to a new guild:'
                                    )
                                    .addFields(
                                        {
                                            name: 'Guild Name:',
                                            value: guild.name,
                                            inline: true,
                                        },
                                        {
                                            name: 'Guild ID:',
                                            value: guild.id,
                                            inline: true,
                                        },
                                        {
                                            name: 'Guild Created At:',
                                            value: guild.createdAt,
                                            inline: true,
                                        },
                                        {
                                            name: 'Guild Members:',
                                            value: guild.memberCount,
                                            inline: true,
                                        },
                                        {
                                            name: 'Guild Owner Username:',
                                            value: guild.owner.user.username,
                                            inline: true,
                                        },
                                        {
                                            name: 'Guild Owner Tag:',
                                            value:
                                                guild.owner.user.discriminator,
                                            inline: true,
                                        },
                                        {
                                            name: 'Guild Owner ID:',
                                            value: guild.ownerID,
                                            inline: true,
                                        },
                                        {
                                            name:
                                                'Guild Owner Account Created At:',
                                            value: guild.owner.user.createdAt,
                                            inline: true,
                                        },
                                        {
                                            name: 'BOT Permissions:',
                                            value: guild
                                                .member(bot.user)
                                                .permissions.toArray()
                                                .toString()
                                                .replace(/,+/g, '\n'),
                                            inline: true,
                                        },
                                        {
                                            name: 'Added By:',
                                            value: `<@${integration.user.id}>`,
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
            )
            .catch(error => console.error(error));
    else
        bot.channels.cache
            .get('798435692794347520')
            .send(
                new MessageEmbed()
                    .setAuthor(
                        guild.owner.user.tag,
                        guild.owner.user.avatarURL({
                            dynamic: true,
                        })
                    )
                    .setTitle('New guild')
                    .setThumbnail(
                        guild.iconURL({
                            format: 'png',
                            dynamic: true,
                            size: 2048,
                        })
                    )
                    .setColor(0x008b03)
                    .setDescription('I have been added to a new guild:')
                    .addFields(
                        {
                            name: 'Guild Name:',
                            value: guild.name,
                            inline: true,
                        },
                        { name: 'Guild ID:', value: guild.id, inline: true },
                        {
                            name: 'Guild Created At:',
                            value: guild.createdAt,
                            inline: true,
                        },
                        {
                            name: 'Guild Members:',
                            value: guild.memberCount,
                            inline: true,
                        },
                        {
                            name: 'Guild Owner Username:',
                            value: guild.owner.user.username,
                            inline: true,
                        },
                        {
                            name: 'Guild Owner Tag:',
                            value: guild.owner.user.discriminator,
                            inline: true,
                        },
                        {
                            name: 'Guild Owner ID:',
                            value: guild.ownerID,
                            inline: true,
                        },
                        {
                            name: 'Guild Owner Account Created At:',
                            value: guild.owner.user.createdAt,
                            inline: true,
                        },
                        {
                            name: 'BOT Permissions:',
                            value: guild
                                .member(bot.user)
                                .permissions.toArray()
                                .toString()
                                .replace(/,+/g, '\n'),
                            inline: true,
                        }
                    )
                    .setTimestamp()
                    .setFooter(bot.user.username, bot.user.avatarURL())
            )
            .catch(error => console.error(error));
};
