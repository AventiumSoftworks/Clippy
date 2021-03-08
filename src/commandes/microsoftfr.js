const Discord = require('discord.js');
module.exports = {
	name: 'microsoftfr',
	description: 'À propos des comptes Microsoft.',
	aliases: ['msafr', 'msfr'],
	usage: '',
	cooldown: 5,
	async execute(client, message, args) {
		const ms = new Discord.MessageEmbed()
			.setColor('BLURPLE')
			.setTitle('Le support des comptes Microsoft est en cours.')
			.addField('Nous savons que le support de ces comptes est important, nous sommes en train de l\'implémenter.', 'Il n\'y a pas de date de sortie, mais si vous voulez nous aider, vous pouvez essayer [ce pull request](https://github.com/dscalzi/HeliosLauncher/pull/143) et partager vos commentaires. Attention, des bugs peuvent survenir.')
			.setFooter(`Asked by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(ms);
	},
};