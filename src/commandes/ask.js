const Discord = require('discord.js');
module.exports = {
	name: 'ask',
	description: 'Dont ask to ask! Just ask.',
	aliases: ['justask', 'dontasktoask'],
	usage: '',
	cooldown: 5,
	async execute(client, message, args) {
		const ask = new Discord.MessageEmbed()
			.setTitle('Dont ask to ask, just ask!')
			.setColor('BLURPLE')
			.addField('Hey, it seems you have a problem and you are looking for a solution.', 'But when you ask for help, please don\' just send "Can someone help me?", please describe your problem, then we\'ll be able to help you. [(You may read this)](https://dontasktoask.com)')
			.addField('Did you already checked our Wiki?', 'It does contain some useful informations, so don\'t forget to [check it out](https://github.com/dscalzi/helioslauncher/wiki).')
			.setTimestamp()
			.setFooter(`Asked by ${message.author.tag}`, message.author.displayAvatarURL());
		message.lineReply(ask);
	},
};