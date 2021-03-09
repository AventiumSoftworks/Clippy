const config = require("../config.json")
module.exports = async (client) => {
    let i = 0;
    const status = [
        `${client.users.cache.size} members.`,
        `messages on ${client.channels.cache.size} channels.`,
        'my source code on https://github.com/GeekCornerGH/Clippy.',
        'and new messages.',
        `my ping, that have an average of ${client.ws.ping}ms.`,
        `my ${client.commands.size} commands.`,
        ``
    ];
    console.log('Hello world!');
    console.info(`Logged in as ${client.user.tag} with ID ${client.user.id}`);
    client.user.setPresence({ status: 'online', activity: { name: `${config.prefix}help`, type: 'WATCHING' } });
    setInterval(() => client.user.setActivity(`${config.prefix}help | ${status[i++ % status.length]}`, { type: 'WATCHING' }), 15000);
};