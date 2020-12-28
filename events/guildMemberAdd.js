const { Client, GuildMember, MessageEmbed } = require('discord.js');

const { blacklist, legitimateUsers } = require('../data.json');

/**
 * 
 * @param {Client} bot 
 * @param {GuildMember} newGuildMember 
 */
module.exports = (bot, newGuildMember) => {
    const blacklistUserFilter = blacklist.userIds.filter(userId => userId === newGuildMember.id);
    const altsFilter = new RegExp(
        `(${newGuildMember.guild.members.cache.filter(
            guildMember => guildMember.id === newGuildMember.id
        ).forEach(user => user)})`
    );

    if (blacklistUserFilter.length > 0) {
        newGuildMember.ban({
            reason: 'This user is part of the blacklist.'
        })
            .then(guildMember => guildMember.guild.owner.send(new MessageEmbed()
                .setAuthor(guildMember.guild.owner.user.tag, guildMember.guild.owner.user.avatarURL())
                .setColor(0x008b03)
                .setTitle('Blacklist User banned')
                .setThumbnail(guildMember.user.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))
                .setDescription(`**Banned member:** <@${guildMember.id}>`)
                .addFields(
                    {name: 'Username:', value: guildMember.user.username, inline: true},
                    {name: 'User tag:', value: guildMember.user.discriminator, inline: true},
                    {name: 'User ID:', value: guildMember.id, inline: true},
                    {
                        name: 'User presence:',
                        value: bot.activityStatus(guildMember.user.presence.status),
                    inline: true},
                    {name: 'Account created at:', value: guildMember.user.createdAt, inline: true}
                )
                .setTimestamp()
                .setFooter(bot.user.username, bot.user.avatarURL())
            ))
            .catch(error => console.error(error));
    }
}