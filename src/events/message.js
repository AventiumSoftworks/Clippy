const config = require("../config.json");
const Discord = require("discord.js");

module.exports = async (client, message) => {
    if (message.webhookID) {
        if (message.channel.id == "302681957387599872") {
            if (message.embeds[0]) {
                if (message.embeds[0].title.includes("New star added")) {
                    message.react("♥️");
                }
            } 
        }
    }
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    // Arguments
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
            return message.lineReply(reply);
        }
    }

    // Cooldown
    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            return message.react('⏰');
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Execution
    try {
        command.execute(client, message, args);
    }
    catch (error) {
        console.error(error);
        return message.lineReply('THere was an error trying to execute that command!');
    }

    // Anti mp
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.lineReply('I can\'t execute that command inside DMs!');
    }
}