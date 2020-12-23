const { Client, Message, MessageEmbed } = require('discord.js');

const { blackList } = require('../data.json');

/**
 * @param {Client} bot 
 * @param {Message} message 
 */
module.exports = async (bot, message) => {
    console.log(message.guild.members.cache.filter(member => member.user.username.match(RegExp(/^k/))).map(member => member));

    blackList.forEach(async userId => await bot.users.fetch(userId)
        .then(async user => await message.channel.send(new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor('DARK_RED')
            .setTitle(`${user.tag} info`)
            .setThumbnail(
                user.avatarURL() === null ? user.defaultAvatarURL : user.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                })
            )
            .setDescription(`Information about <@${user.id}>:`)
            .addFields(
                {name: 'Username:', value: user.username, inline: true},
                {name: 'Tag:', value: user.discriminator, inline: true},
                {name: 'ID:', value: user.id, inline: true},
                {name: 'Presense:', value: bot.activityStatus(user.presence.status), inline: true},
                {name: 'Account created at:', value: user.createdAt, inline: true}
            )
            .setTimestamp()
            .setFooter(bot.user.username, bot.user.avatarURL())
        ))
        .catch(error => console.log(error))
    );
}