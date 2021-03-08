const Discord = require('discord.js');
module.exports = {
	name: 'crackfr',
	description: 'À propos des cracks.',
	aliases: ['offlinefr', 'cracksfr'],
	usage: '',
	cooldown: 5,
	async execute(client, message, args) {
		const crack = new Discord.MessageEmbed()
			.setColor('BLURPLE')
			.setTitle('404 - Not found')
			.setDescription('Helios Launcher ne supporte pas les versions crackées (ou offline) de Minecraft. Et elles ne seront jamais supportées.')
			.addField('Les versions crackées sont interdites.', 'Quand vous jouez à Minecraft, vous acceptez les [Conditions de Mojang](https://account.mojang.com/terms), qui stipulent que vous devez obtenir une copie légale de Minecraft pour y jouer.\nN\'espérez pas obtenir de l\'aide concernant les cracks.')
			.setTimestamp()
			.setFooter(`Demandé par ${message.author.tag}`, message.author.displayAvatarURL());
		message.channel.send(crack);
	},
};