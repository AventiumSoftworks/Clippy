const Discord = require("discord.js");
module.exports = {
    name: 'paste',
    description: 'Don\'t send txt files, use a paste service.',
    aliases: ['haste', 'hastebin', 'pastebin'],
    usage: '',
    cooldown: 5,
    execute(client, message, args) {
        var paste = new Discord.MessageEmbed()
            .setTitle('Please send us pastebin links!')
            .setColor('BLURPLE')
            .addField('Hey, please don\'t send us txt files when you send logs.', 'Use a paste service like: [Pastebin](https://pastebin.com), [Hastebin](https://hastebin.com) or [KPaste](https://kpaste.infomaniak.com).')
            .setTimestamp()
            .setFooter(`Asked by ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send(paste);
    }
}
