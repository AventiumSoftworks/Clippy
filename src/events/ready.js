const config = require("../config.json");
const fetch = require("node-fetch");
module.exports = async (client) => {
    let i = 0;
    const helios = await fetch("https://api.github.com/repos/dscalzi/HeliosLauncher");
    const api1 = await helios.json();
    const nebula = await fetch("https://api.github.com/repos/dscalzi/Nebula");
    const api2 = await nebula.json();
    const clippy = await fetch("https://api.github.com/repos/GeekCornerGH/Clippy");
    const api3 = await clippy.json();
    const status = [
        `and ${client.users.cache.size} members.`,
        `and messages on ${client.channels.cache.size} channels.`,
        'and my source code on https://github.com/GeekCornerGH/Clippy.',
        'and new messages.',
        `and my ping, that have an average of ${client.ws.ping}ms.`,
        `and my ${client.commands.size} commands.`,
        `and ${api1.forks} forks on Helios Repo`,
        `and ${api1.stargazers_count} stars on Helios repo`,
        `and ${api2.forks} forks on Nebula repo`,
        `and ${api2.stargazers_count} stars on Nebula repo`,
        `and ${api3.forks} forks on my own repo`,
        `and ${api3.stargazers_count} stars on my own repo`
    ];
    console.log('Hello world!');
    console.info(`Logged in as ${client.user.tag} with ID ${client.user.id}`);
    client.user.setPresence({ status: 'online', activity: { name: `${config.prefix}help`, type: 'WATCHING' } });
    setInterval(() => client.user.setActivity(`${config.prefix}help ${status[i++ % status.length]}`, { type: 'WATCHING' }), 10000);
};