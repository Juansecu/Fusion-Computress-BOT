const { Client, Message, MessageEmbed } = require('discord.js');

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array<string>} args
 */
module.exports = async (bot, message, args) => {
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
        if (!args[0])
            message.channel.send(
                new MessageEmbed()
                    .setAuthor(
                        message.author.tag,
                        message.author.avatarURL({
                            dynamic: true,
                        })
                    )
                    .setTitle('MISSING ARGUENT')
                    .setThumbnail(
                        bot.user.avatarURL({
                            format: 'png',
                            dynamic: true,
                            size: 2048,
                        })
                    )
                    .setColor('RED')
                    .setDescription(
                        'You must give me a number of messages to delete.'
                    )
            );
        else {
            const messageNumber = parseInt(args[0]);

            if (typeof messageNumber !== typeof Number())
                message.channel.send('You must give me a number.');
            else {
                await message.delete();

                message.channel
                    .bulkDelete(messageNumber)
                    .then(() => {
                        message.channel
                            .send(
                                `\`Have deleted ${messageNumber.toString()} messages.\``
                            )
                            .then(msg =>
                                msg.delete({
                                    timeout: 5000,
                                })
                            )
                            .catch(error => {
                                message.channel.send(
                                    `I'm so sorry. An internal error has ocurred!\n\`\`\`console\n${error}\n\`\`\``
                                );
                            });
                    })
                    .catch(error => console.error(error));
            }
        }
    } else
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
                    'You do not have the necessary permissions to use that command.'
                )
                .setTimestamp()
                .setFooter(bot.user.username, bot.user.avatarURL())
        );
};
