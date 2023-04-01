const {EmbedBuilder} = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        const cmdfile = require(`../commandes/${interaction.commandName}.js`);
        let embed = new EmbedBuilder()
            .setTitle(cmdfile.title)
            .setColor("Blurple")
            .setDescription(cmdfile.description ?? null)
            .setTimestamp()
            .setFooter({text:(interaction.commandName.endsWith("fr") && !interaction.commandName.endsWith("frfr") ? "Demandé par : " : "Requested by : ") + interaction.user.tag, iconURL: interaction.user.displayAvatarURL()});
        cmdfile.fields.forEach(field => {
            embed.addFields({name:field.title, value:field.description});
        });
        interaction.reply({ content: interaction.options.getUser("user") && interaction.options.getUser("user").id !== interaction.user.id ? `${interaction.options.getUser("user")}` : null, embeds: [embed], ephemeral: interaction.options.getUser("user") &&interaction.options.getUser("user").id!== interaction.user.id ? false : true });
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
