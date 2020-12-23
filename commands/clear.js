module.exports = async (bot, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    else {
        if (!args) return message.channel.send('You must give me a number of message to delete.');
        else {
            await message.delete();

            const messageNumber = parseInt(args[0]);

            if (typeof messageNumber !== typeof Number()) return message.channel.send('You must give me a number.');
            else return message.channel.bulkDelete(messageNumber)
                .then(() => {
                    message.channel.send(`\`Have deleted ${messageNumber.toString()} messages.\``)
                        .then(msg => msg.delete({
                            timeout: 5000
                        }))
                        .catch(error => {
                            message.channel.send(`I'm so sorry. An internal error has ocurred!\n\`\`\`console\n${error}\n\`\`\``);
                        });
                })
                .catch(error => console.error(error));
        }
    }
}