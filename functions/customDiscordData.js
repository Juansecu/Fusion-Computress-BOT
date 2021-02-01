/**
 * @param {string} status Represents the presence status from a User.
 * @returns {string} Returns a custom value for the presence status from a user.
 */
module.exports.activityStatus = status => {
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
};
