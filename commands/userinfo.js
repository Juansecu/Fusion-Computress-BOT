const { MessageEmbed, UserManager } = require('discord.js');

module.exports = (bot, message, args) => {
    if (args.length === 0) {
        message.channel.send(new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor(0x008b03)
            .setTitle(`${message.author.tag} info`)
            .setThumbnail(message.author.avatarURL({
                format: 'png',
                dynamic: true,
                size: 2048
            }))
            .setDescription(`Information about <@${message.author.id}>:`)
            .addFields(
                {name: 'Username:', value: message.author.username, inline: true},
                {name: 'Tag:', value: message.author.discriminator, inline: true},
                {name: 'ID', value: message.author.id, inline: true},
                {name: 'Account created at:', value: message.author.createdAt, inline: true},
                {name: 'Presense:', value: bot.activityStatus(message.author.presence.status), inline: true}
            )
            .setTimestamp()
            .setFooter(bot.user.username, bot.user.avatarURL())
        );
    } else {
        args.forEach(async arg => {
            if (arg.match(/^(<@)/)) {
                message.mentions.users.map(async user => {
                    await new UserManager(bot).fetch(user.id)
                        .then(userInfo => {
                            message.channel.send(
                                new MessageEmbed()
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setColor(0x008b03)
                                    .setTitle(`${userInfo.tag} info`)
                                    .setThumbnail(userInfo.avatarURL({
                                        format: 'png',
                                        dynamic: true,
                                        size: 2048
                                    }))
                                    .setDescription(`Information about <@${userInfo.id}>:`)
                                    .addFields(
                                        {name: 'Username:', value: userInfo.username, inline: true},
                                        {name: 'Tag:', value: userInfo.discriminator, inline: true},
                                        {name: 'ID', value: userInfo.id, inline: true},
                                        {name: 'Account created at:', value: userInfo.createdAt, inline: true},
                                        {name: 'Presense:', value: bot.activityStatus(userInfo.presence.status), inline: true}
                                    )
                                    .setTimestamp()
                                    .setFooter(bot.user.username, bot.user.avatarURL())
                            );
                        })
                        .catch(error => console.log(error));
                });
            } else if (!arg.match(/^\W$/)) {
                await bot.users.fetch(arg)
                    .then(user => {
                        message.channel.send(
                            new MessageEmbed()
                                .setAuthor(message.author.tag, message.author.avatarURL())
                                .setColor(0x008b03)
                                .setTitle(`${user.tag} info`)
                                .setThumbnail(user.avatarURL({
                                    format: 'png',
                                    dynamic: true,
                                    size: 2048
                                }))
                                .setDescription(`Information about <@${user.id}>:`)
                                .addFields(
                                    {name: 'Username:', value: user.username, inline: true},
                                    {name: 'Tag:', value: user.discriminator, inline: true},
                                    {name: 'ID', value: user.id, inline: true},
                                    {name: 'Account created at:', value: user.createdAt, inline: true},
                                    {name: 'Presense:', value: bot.activityStatus(user.presence.status), inline: true}
                                )
                                .setTimestamp()
                                .setFooter(bot.user.username, bot.user.avatarURL())
                        );
                    })
                    .catch(() => message.channel.send(
                        new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL())
                            .setColor('RED')
                            .setDescription('Sorry. I couldn\'t find that User. Please, verify the User ID and try again.')
                            .setTimestamp()
                            .setFooter(bot.user.username, bot.user.avatarURL())
                    ));
            } else {
                messageEmbed.setColor('RED')
                    .setDescription('The User ID is not valid.');
    
                message.channel.send(messageEmbed);
            }
        });
    }
}