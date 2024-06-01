const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = async (client, message) => {
    if (message.member.id === client.user.id ||!message.guild || !config.loggedServers.includes(message.guild.id) || !message.content) return;
    const embed1 = new EmbedBuilder()
    .setAuthor({ name: `${message.member.displayName} (${message.member.id})`, iconURL: `${message.member.displayAvatarURL()}` })
        .setTitle("Message contents")
        .setColor("Red")
        .setDescription(message.content);
    client.channels.cache.get(config.logsChannelId).send({ content: "A message has been deleted", embeds: [embed1] })
}