const { MessageEmbed } = require("discord.js");
module.exports = async (client) => {
	let data;
	client.ws.on("INTERACTION_CREATE", async interaction => {
		if (interaction.data.component_type) return;
		const command = interaction.data.name.toLowerCase();
		const args = interaction.data.options;
		const cmdfile = require(`../commandes/${command}.js`);
		let embed = new MessageEmbed()
			.setTitle(cmdfile.title)
			.setColor("BLURPLE")
			.setDescription(cmdfile.description != null ? cmdfile.description : "")
			.setTimestamp()
			.setFooter((command.endsWith("fr") && !command.endsWith("frfr") ? "Demandé par : " : "Asked by : ") + interaction.member.user.username + "#" + interaction.member.user.discriminator, `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`);
		cmdfile.fields.forEach(field => {
			embed.addField(field.title, field.description);
		});
		console.error(args);
		if (args && args[0]) {
			data = {
				data: {
					type: 4,
					data: {
						content: `<@${args[0].value}>`,
						embeds: [embed]
					}
				}
			};
		}
		else {
			data = {
				data: {
					type: 4,
					data: {
						flags: 1 << 6,
						embeds: [embed]
					}
				}
			};
		}
		client.api.interactions(interaction.id, interaction.token).callback.post(data);
	});
};