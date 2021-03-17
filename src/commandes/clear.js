module.exports = {
	name: 'clear',
	description: 'Purge messages.',
	aliases: ['purge'],
	usage: '<Number of messages to delete (>=99)>',
	cooldown: 5,
	async execute(client, message, args) {
		if (!message.guild.members.cache.get(message.author.id).hasPermission('MANAGE_MESSAGES')) return message.channel.send('❌ You don\'t have permission to do this.');
		if (!message.guild.members.cache.get(client.user.id).hasPermission('MANAGE_MESSAGES')) return message.channel.send('❌ I don\'t have permission to delete messages.');
		const amount = parseInt(args[0]) + 1;
		if (!args[0]) return message.channel.send('❌ Please provide how many messages you want to delete.');
		if (isNaN(args[0])) return message.channel.send('❌ The provided number was not a number.');
		if (args[0] > 99 || args[0] < 1) return message.channel.send(`❌ You cann't delete ${args[0] < 1 ? 'less than 1 message.' : 'more than 99 messages.'}`);
		message.channel.bulkDelete(amount).then(async () => {
			const msg = await message.channel.send(`${amount} ${amount === 1 ? 'message' : 'messages'} have been deleted.`);
			await msg.delete({ timeout: 5000 });
		});


	},
};