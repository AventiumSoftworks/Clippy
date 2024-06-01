const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = async (client, oldMessage, newMessage) => {
    if (!oldMessage.guild || !config.loggedServers.includes(oldMessage.guild.id) || !oldMessage.content || !newMessage.content || oldMessage.content === newMessage.content) return;
    const embed1 = new EmbedBuilder()
        .setAuthor({ name: `${oldMessage.member.displayName} (${oldMessage.user.id})`, icon: `${oldMessage.member.displayAvatarURL()}` })
        .setTitle("Old message contents")
        .setColor("Red")
        .setDescription(oldMessage.content);
    const embed2 = new EmbedBuilder()
        .setAuthor({ name: `${oldMessage.member.displayName} (${oldMessage.user.id})`, icon: `${oldMessage.member.displayAvatarURL()}`})
        .setTitle("New message contents")
        .setColor("Green")
        .setDescription(newMessage.content);
    client.channels.cache.get(config.logsChannelId).send({ content: `A message has been updated (${oldMessage.url})`, embeds: [embed1, embed2] })
}