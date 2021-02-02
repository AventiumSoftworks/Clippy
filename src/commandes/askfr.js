const Discord = require("discord.js");
module.exports = {
    name: 'askfr',
    description: 'Ne demande pas la permission de demander, demande simplement.',
    aliases: ['justaskfr', 'dontasktoaskfr'],
    usage: '',
    cooldown: 5,
    execute(client, message, args) {
        var ask = new Discord.MessageEmbed()
            .setTitle('Ne demande pas la permission de demander, demande simplement')
            .setColor('BLURPLE')
            .addField('Hey, on dirait que tu as un problème et que tu as un problème, et que tu cherches une solution.', 'Quand tu demandes de l\'aide, n\'écris pas seulement "Est-ce que quelqu\'un peut m\'aider?", décris simplement ton problème, ainsi nous pourrons t\'aider. [(Tu devrais lire ceci)](https://dontasktoask.com/fr)')
            .addField('As-tu déjà regardé le Wiki?', 'Il contient des informations utiles, alors n\'oublie pas d\'aller [le consulter (en anglais)](https://github.com/dscalzi/helioslauncher/wiki).')
            .setTimestamp()
            .setFooter(`Demandé par ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send(ask);
    }
}