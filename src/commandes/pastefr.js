const Discord = require('discord.js');
module.exports = {
	name: 'pastefr',
	description: 'N\'envoyez pas de fichiers txt, utiliser un service paste.',
	aliases: ['hastefr', 'hastebinfr', 'pastebinfr'],
	usage: '',
	cooldown: 5,
	async execute(client, message, args) {
		const paste = new Discord.MessageEmbed()
			.setTitle('S\'il vous plaît, envoyez-nous un lien pastebin')
			.setColor('BLURPLE')
			.addField('Hey, n\'envoyez pas de fichiers txt quand vous transférez des logs.', 'Utilisez un service de paste paste comme: [Pastebin](https://pastebin.com), [Hastebin](https://hastebin.com) ou [KPaste](https://kpaste.infomaniak.com).')
			.setTimestamp()
			.setFooter(`Demandé par ${message.author.tag}`, message.author.displayAvatarURL());
		message.channel.send(paste);
	},
};
