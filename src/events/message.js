const config = require("../config.json");
const Discord = require("discord.js");
module.exports = async (client, message) => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    if (message.webhookID) {
        if (message.channel.id == '302681957387599872') {
            if (message.embeds[0]) {
                if (message.embeds[0].title.includes('New star added')) message.react('♥️');
                if (message.embeds[0].title.includes('Fork created')) message.react("👌");
                if (message.embeds[0].title.includes('GitHub Actions checks success on master')) message.react("✅");
            }
        }
    }

    if (message.content == `${config.prefix}register_commands`) {
        if (!config.botOwners.includes(message.author.id)) return message.lineReply(`Hello <@${message.author.id}>, you don't have permission to register slash commands.`, new Discord.MessageEmbed().setImage("https://media2.giphy.com/media/Ju7l5y9osyymQ/giphy.gif"));
        await message.react("👌");
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "ask",
                "description": "Don't ask to ask, just ask!",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "The user to mention",
                        "required": false
                    }
                ]
            }
        })
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "askfr",
                "description": "Ne demande pas la permission de demander, demande simplement",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "L'utilisateur à mentionner",
                        "required": false
                    }
                ]
            }
        })
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "crack",
                "description": "Here is what you need to know about cracks.",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "The user to mention",
                        "required": false
                    }
                ]
            }
        })
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "crackfr",
                "description": "Voici ce que vous devez savoir à propos des cracks",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "L'utilisateur à mentionner",
                        "required": false
                    }
                ]
            }
        })
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "microsoft",
                "description": "Here is what you need to know about Microsoft Login.",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "The user to mention",
                        "required": false
                    }
                ]
            }
        })
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "microsoftfr",
                "description": "Voici ce que vous devez savoir à propos de la connexion via Microsoft",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "L'utilisateur à mentionner",
                        "required": false
                    }
                ]
            }
        })
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "nebula",
                "description": "Here is how to change servers on Helios Launcher",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "The user to mention",
                        "required": false
                    }
                ]
            }
        })
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "nebulafr",
                "description": "Voici comment changer les serveurs sur Helios Launcher",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "L'utilisateur à mentionner",
                        "required": false
                    }
                ]
            }
        })
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "paste",
                "description": "Don't send log files, use a paste service",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "The user to mention",
                        "required": false
                    }
                ]
            }
        })
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "pastefr",
                "description": "N'envoyez pas de fichiers de log, utiliser un service de partage de texte",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "L'utilisateur à mentionner",
                        "required": false
                    }
                ]
            }
        })
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "v14",
                "description": "Please use Node.JS 14",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "The user to mention",
                        "required": false
                    }
                ]
            }
        })
        await client.api.applications(client.user.id).commands.post({
            data: {
                "name": "v14fr",
                "description": "Veuillez utiliser Node.JS 14",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "L'utilisateur à mentionner",
                        "required": false
                    }
                ]
            }
        })
        await message.react("👌");
        await message.lineReply("I asked Discord to save the slash commands. Changes can take up to an hour to apply.")
    }
    else if (message.content == `${config.prefix}clear`) {
        if (!message.guild.members.cache.get(message.author.id).hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ You don't have permission to do this.");
        if (!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ I don't have permission to delete messages.");
        const amount = parseInt(args[0]) + 1;
        if (!args[0]) return message.channel.send("❌ Please provide how many messages you want to delete.");
        if (isNaN(args[0])) return message.channel.send("❌ The provided number was not a number.");
        if (args[0] > 99 || args[0] < 1) return message.channel.send(`❌ You cann't delete ${args[0] < 1 ? "less than 1 message." : "more than 99 messages."}`);
        message.channel.bulkDelete(amount).then(async () => {
            let msg = await message.channel.send(`${amount} ${amount === 1 ? "message" : "messages"} have been deleted.`)
            await msg.delete({ timeout: 5000 })
        });
    }
    else if (message.content == `${config.prefix}eval`) {
        const code = args.join(' ');
        if (!config.botOwners.includes(message.author.id)) {
            message.lineReply(`Hello ${message.author.tag}, you are not allowed to do this.`);
            return;
        }
        if (!args[0]) {
            return message.lineReply('❌ Please send what do you want to eval');
        }
        if (code.includes('client.token')) {
            return message.lineReply('🔒 The requested data is confidential.');
        }
        else if (message.content.includes('config')) {
            return message.lineReply('🔒 The requested data is confidential.');
        }
        const clean = text => {
            if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)); }
            else { return text; }
        };
        try {
            let evaled = eval(code);

            if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled); }

            message.lineReply(clean(evaled), { code: 'xl' });
        }
        catch (err) {
            message.lineReply(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
};