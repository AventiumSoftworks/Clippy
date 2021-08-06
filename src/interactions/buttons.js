const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
module.exports = async (client) => {
	client.on("message", message => {
		if (message.content !== `${config.prefix}rr`) return;
		if (!config.botOwners.includes(message.author.id)) return message.lineReply(`Hello <@${message.author.id}>, you don't have permission to summon role selector.`, new MessageEmbed().setImage("https://media2.giphy.com/media/Ju7l5y9osyymQ/giphy.gif"));
		message.delete();
		const user = new MessageButton()
			.setLabel("User role")
			.setStyle("blurple")
			.setID("user")
			.setEmoji("👤");
		const helios = new MessageButton()
			.setLabel("Helios User role")
			.setStyle("blurple")
			.setID("helios")
			.setEmoji("🌅");
		message.channel.send(new MessageEmbed()
			.setTitle("Click the buttons to get/remove a user role!")
			.setColor("BLURPLE")
			.setDescription("👤 User - General role\n🌅 Helios User - Helios Launcher specific role")
			.addField("You cann't invite me on your server, but I am open source!", "[Source Code](https://github.com/GeekCornerGH/Clippy)")
			.setFooter("Made with ❤ by GeekCornerD#8010", "https://cdn.discordapp.com/avatars/710836174050164757/a_46c1958617a1d46fa46fab0663965ff8.gif?size=1024"), new MessageActionRow().addComponent([user, helios]));
	});

	client.on("clickButton", async (button) => {
		const Member = await button.guild.members.fetch({ user: button.clicker.user.id, force: true })


		if (button.id == "user") {
			let hasrole = await Member.roles.cache.has("283835036820832256");
			if (hasrole) await Member.roles.remove("283835036820832256").catch(console.error).then(async () => await button.reply.send('User role have been removed from your profile!', true));
			else await Member.roles.add("283835036820832256").catch(console.error).then(async () => await button.reply.send('User role have been granted to you!', true));

		}
		else if (button.id == "helios") {
			let hasrole = await Member.roles.cache.has("668160422368772116");
			if (hasrole) await Member.roles.remove("668160422368772116").catch(console.error).then(async () => await button.reply.send('Helios User role have been removed from your profile!', true));
			else await Member.roles.add("668160422368772116").catch(console.error).then(async () => await button.reply.send('Helios User role have been granted to you!', true));
		};
	});
};