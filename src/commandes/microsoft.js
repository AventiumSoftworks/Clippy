const Discord = require('discord.js');
module.exports = {
	name: 'microsoft',
	description: 'About Microsoft Accounts.',
	aliases: ['msa', 'ms'],
	usage: '',
	cooldown: 5,
	async execute(client, message, args) {
		const ms = new Discord.MessageEmbed()
			.setColor('BLURPLE')
			.setTitle('Microsoft Accounts support is in progress')
			.addField('We know that the support of these accounts is important, we are in the process of implementing this.', 'There is no ETA, but if you want to help us, you can try [this pull request](https://github.com/dscalzi/HeliosLauncher/pull/143) and share you feedback. Warning, this is unstable')
			.setFooter(`Asked by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.lineReply(ms);
	},
};