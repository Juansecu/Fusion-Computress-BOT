const { Presence } = require('discord.js');

/**
 * @param {Presence} status 
 */
module.exports.activityStatus = (status) => {
    switch (status) {
        case 'online':
            status = 'Online';
            break;
        case 'idle':
            status = 'AFK';
            break;
        case 'offline':
            status = 'Offline';
            break;
        case 'dnd':
            status = 'Do Not Disturb';
            break;
        default:
            status;
    }

    return status;
}