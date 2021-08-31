const {MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        const cmdfile = require(`../commandes/${interaction.commandName}.js`);
        let embed = new MessageEmbed()
            .setTitle(cmdfile.title)
            .setColor("BLURPLE")
            .setDescription(cmdfile.description != null ? cmdfile.description : "")
            .setTimestamp()
            .setFooter((interaction.commandName.endsWith("fr") && !interaction.commandName.endsWith("frfr") ? "Demandé par : " : "Asked by : ") + interaction.user.tag, interaction.user.displayAvatarURL());
        cmdfile.fields.forEach(field => {
            embed.addField(field.title, field.description);
        });
        interaction.reply({ content: interaction.options.getUser("user") ? `${interaction.options.getUser("user")}` : null, embeds: [embed], ephemeral: interaction.options.getUser("user")!== null ? false : true });
    };
    if (interaction.isButton()) {
                const Member = await interaction.guild.members.fetch({ user: interaction.user.id, force: true })


                if (interaction.customId == "user") {
                        let hasrole = await Member.roles.cache.has("283835036820832256");
                        if (hasrole) await Member.roles.remove("283835036820832256").catch(console.error).then(async () => await interaction.reply({content: 'User role have been removed from your profile!', ephemeral: true}))
			else await Member.roles.add("283835036820832256").catch(console.error).then(async () => await interaction.reply({content: 'User role have been granted to you!', ephemeral: true}));

                }
                else if (interaction.customId == "helios") {
                        let hasrole = await Member.roles.cache.has("668160422368772116");
                        if (hasrole) await Member.roles.remove("668160422368772116").catch(console.error).then(async () => await interaction.reply({content: 'Helios User role have been removed from your profile', ephemeral: true}))
			else await Member.roles.add("668160422368772116").catch(console.error).then(async () => await interaction.reply({content: 'Helios User role have been granted to you!', ephemeral: true}));
                };
        };
};
