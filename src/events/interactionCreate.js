const { EmbedBuilder } = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.isCommand() && interaction.commandName != "google") {
        const cmdfile = require(`../commandes/${interaction.commandName}.js`);
        let embed = new EmbedBuilder()
            .setTitle(cmdfile.title)
            .setColor("Blurple")
            .setDescription(cmdfile.description ?? null)
            .setTimestamp()
            .setFooter({
                text: (interaction.commandName.endsWith("fr") && !interaction.commandName.endsWith("frfr") ? "Demandé par : " : "Requested by : ") + interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL()
            });
        cmdfile.fields.forEach(field => {
            embed.addFields({ name: field.title, value: field.description });
        });
        interaction.reply({
            content: interaction.options.getUser("user") && interaction.options.getUser("user").id !== interaction.user.id ? `${interaction.options.getUser("user")}` : null,
            embeds: [embed],
            ephemeral: interaction.options.getUser("user") && interaction.options.getUser("user").id !== interaction.user.id ? false : true
        });
    }
    if (interaction.isCommand() && interaction.commandName == "google") {
        const cmdfile = require(`../commandes/${interaction.commandName}.js`);
        if (interaction.options.getString('language') == 'fr') {
            embed = new EmbedBuilder()
                .setTitle(cmdfile.title_fr)
                .setColor("Green")
                .setThumbnail('https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA')
                .setDescription(cmdfile.description_fr ?? null)
                .setTimestamp()
                .setFooter({
                    text: "Demandé par : " + interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL()
                });
        } else if(interaction.options.getString('language') == 'en') {
            embed = new EmbedBuilder()
                .setTitle(cmdfile.title_en)
                .setColor("Yellow")
                .setThumbnail('https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA')
                .setDescription(cmdfile.description_en ?? null)
                .setTimestamp()
                .setFooter({
                    text: "Requested by : " + interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL()
                });
        } else {
            embed = new EmbedBuilder()
                .setTitle(cmdfile.title)
                .setColor("Red")
                .setThumbnail('https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA')
                .setDescription(cmdfile.description_en ?? null)
                .setTimestamp()
                .setFooter({
                    text: "Requested by : " + interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL()
                });
        }
        embed.addFields({ name: interaction.options.getString('search'), value: 'https://natoboram.github.io/lmgtfy/search?q=' + interaction.options.getString('search').replaceAll(' ', '+') + '&btnK=Google+Search' });
        if(interaction.options.getUser("user") && interaction.options.getString("language") == 'fr' && interaction.options.getUser("user").id !== interaction.user.id) {
            content = '<@' + interaction.options.getUser("user") + '>' + ' ' + cmdfile.googleIt_fr
        } else if(interaction.options.getUser("user") && interaction.options.getString("language") == 'en' && interaction.options.getUser("user").id !== interaction.user.id) {
            content = '<@' + interaction.options.getUser("user") + '>' + ' ' + cmdfile.googleIt_en
        } else {
            content = cmdfile.googleIt
        }
        interaction.reply({
            content: content,
            embeds: [embed],
            ephemeral: interaction.options.getUser("user") && interaction.options.getUser("user").id !== interaction.user.id ? false : true
        });
    }
    if (interaction.isButton()) {
        const Member = await interaction.guild.members.fetch({ user: interaction.user.id, force: true });

        if (interaction.customId == "user") {
            let hasrole = await Member.roles.cache.has("283835036820832256");
            if (hasrole) {
                await Member.roles.remove("283835036820832256").catch(console.error).then(async () => await interaction.reply({ content: 'User role has been removed from your profile!', ephemeral: true }));
            } else {
                await Member.roles.add("283835036820832256").catch(console.error).then(async () => await interaction.reply({ content: 'User role has been granted to you!', ephemeral: true }));
            }
        } else if (interaction.customId == "helios") {
            let hasrole = await Member.roles.cache.has("668160422368772116");
            if (hasrole) {
                await Member.roles.remove("668160422368772116").catch(console.error).then(async () => await interaction.reply({ content: 'Helios User role has been removed from your profile', ephemeral: true }));
            } else {
                await Member.roles.add("668160422368772116").catch(console.error).then(async () => await interaction.reply({ content: 'Helios User role has been granted to you!', ephemeral: true }));
            }
        }
    }
};
