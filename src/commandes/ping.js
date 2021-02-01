module.exports = {
    name: 'ping',
    aliases: ['pong', 'ping'],
    description: 'Ping!',
    cooldown: 5,
    args: false,
    guildOnly: true,
	execute(client, message) {
		message.channel.send(`Pong 🏓 | Current API latency: ${client.ws.ping}ms`);
	},
};