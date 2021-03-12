module.exports = {
	name: 'ping',
	aliases: ['pong', 'ping'],
	description: 'Ping!',
	cooldown: 5,
	args: false,
	guildOnly: true,
	async execute(client, message) {
		message.lineReply(`Pong 🏓 | Current API latency: ${client.ws.ping}ms`);
	},
};