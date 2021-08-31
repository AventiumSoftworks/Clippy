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
    if (message.content == `${config.prefix}rr`) {
if (!config.botOwners.includes(message.author.id)) return message.reply(`Hello <@${message.author.id}>, you don't have permission to summon role selector.`)
	const user = new Discord.MessageButton()
                        .setLabel("User role")
                        .setStyle("PRIMARY")
                        .setCustomId("user")
                        .setEmoji("👤");
                const helios = new Discord.MessageButton()
                        .setLabel("Helios User role")
                        .setStyle("PRIMARY")
                        .setCustomId("helios")
                        .setEmoji("🌅");
                message.channel.send({ embeds: [new Discord.MessageEmbed()
                        .setTitle("Click the buttons to get/remove a user role!")
                        .setColor("BLURPLE")
                        .setDescription("👤 User - General role\n🌅 Helios User - Helios Launcher specific role")
                        .addField("You cann't invite me on your server, but I am open source!", "[Source Code](https://github.com/GeekCornerGH/Clippy)")
                        .setFooter("Made with ❤ by GeekCornerD#8010", "https://cdn.discordapp.com/avatars/710836174050164757/a_46c1958617a1d46fa46fab0663965ff8.gif?size=1024")], components: [new Discord.MessageActionRow().addComponents([helios, user])]});
}
    if (message.content == `${config.prefix}register_commands`) {
        if (!config.botOwners.includes(message.author.id)) return message.reply(`Hello <@${message.author.id}>, you don't have permission to register slash commands.`, new Discord.MessageEmbed().setImage("https://media2.giphy.com/media/Ju7l5y9osyymQ/giphy.gif"));
        await message.react("👌");
        await await client.application?.commands.create({
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
        })
        await client.application?.commands.create({
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
        })
        await client.application?.commands.create({
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
        })
        await client.application?.commands.create ({
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
        })
        await client.application?.commands.create({
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
        })
        await client.application?.commands.create({
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
        })
        await client.application?.commands.create({
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
        })
        await client.application?.commands.create({
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
        })
        await client.application?.commands.create({
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
        })
        await client.application?.commands.create({
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
        })
     	await client.application?.commands.create({
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
        })
        await client.application?.commands.create({
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
        })
       await message.reply("I asked Discord to save the slash commands. Changes can take up to an hour to apply.")
    }
    else if (message.content == `${config.prefix}clear`) {
        if (!message.guild.members.cache.get(message.author.id).permissions.has("MANAGE_MESSAGES")) return message.channel.send("❌ You don't have permission to do this.");
        if (!message.guild.members.cache.get(client.user.id).permissions.has("MANAGE_MESSAGES")) return message.channel.send("❌ I don't have permission to delete messages.");
        const amount = parseInt(args[0]) + 1;
        if (!args[0]) return message.channel.send("❌ Please provide how many messages you want to delete.");
        if (isNaN(args[0])) return message.channel.send("❌ The provided number was not a number.");
        if (args[0] > 99 || args[0] < 1) return message.channel.send(`❌ You cann't delete ${args[0] < 1 ? "less than 1 message." : "more than 99 messages."}`);
        await message.channel.bulkDelete(amount).then(async () => {
            let msg = await message.channel.send(`${amount} ${amount === 1 ? "message" : "messages"} have been deleted.`)
            await msg.delete({ timeout: 5000 })
        });
    }
    else if (message.content == `${config.prefix}eval`) {
        const code = args.join(' ');
        if (!config.botOwners.includes(message.author.id)) {
            message.reply(`Hello ${message.author.tag}, you are not allowed to eval stuff do this.`);
            return;
        }
        if (!args[0]) {
            return message.reply('❌ Please send what do you want to eval');
        }
        if (code.includes('client.token')) {
            return message.reply('🔒 The requested data is confidential.');
        }
        else if (message.content.includes('config')) {
            return message.reply('🔒 The requested data is confidential.');
        }
        const clean = text => {
            if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)); }
            else { return text; }
        };
        try {
            let evaled = eval(code);

            if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled); }

            message.reply(clean(evaled), { code: 'xl' });
        }
        catch (err) {
            message.reply(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
};
