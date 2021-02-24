const Discord = require("discord.js");
module.exports = {
    name: 'crack',
    description: 'About crack.',
    aliases: ['offline', 'crack'],
    usage: '',
    cooldown: 5,
    execute(client, message, args) {
        var crack = new Discord.MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('404 - Not found')
            .setDescription("Helios Launcher doesn't supports cracked version of Minecraft. And he never will.")
            .addField("Cracked versions of Minecraft are illegal.", "When playing Minecraft, you agree the [Mojang's Terms](https://account.mojang.com/terms), that say you need to own a copy of the game to play Minecraft.\nWe won't help you about cracked versions.")
            .setTimestamp()
            .setFooter(`Asked by ${message.author.tag}`, message.author.displayAvatarURL())
            message.channel.send(crack)
    }
}