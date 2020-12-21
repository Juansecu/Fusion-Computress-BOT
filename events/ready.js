module.exports = bot => {
    bot.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'Looking for alts.',
            type: 'PLAYING'
        }
    });
}