const { images, prefix, botOwners, allowedChannels, frenchChannels, frenchTags, files } = require("../config.json");
const responses = require("./../replies/replies.json");
const messageParser = require("../replies/AutoReplies")
const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, REST, Routes, SlashCommandBuilder, ButtonStyle, ChannelType } = require("discord.js");
const fs = require("node:fs");
const { Wit } = require("node-wit");
const { Colors } = require("discord.js");
const { honeypotChannelId, logsChannelId, witToken } = require(__dirname + '/../config.json')
const witClient = new Wit({ accessToken: witToken });
const parser = new messageParser(responses);
module.exports = async (client, message) => {
    if (message.channel.id === honeypotChannelId) {
        const { id, isBannable } = message.member ?? { isBannable: false };
        if (isBannable) {
            try {
                const embed = new EmbedBuilder()
                    .setTitle("Your account seems to be compromised.")
                    .setColor(Colors.Red)
                    .setDescription("Your account was found to spam messages into every channel of our server. To keep our community safe, you have been kicked from the server.\nPlease make sure to change your password to disconnect any unauthorized session. You might also need to reinstall your computer.\nOnce you're ready, you're more than welcome to join back our server. The link is [on our Readme file](https://github.com/dscalzi/HeliosLauncher/?tab=readme-ov-file#resources).");
                await message.member.send({ embeds: [embed] });
            }
            catch { }
            await message.guild.members.ban(message.author.id, { reason: "Compromised account - Automated softban", deleteMessageSeconds: 60 });
            await message.guild.members.unban(message.author.id, "Automatic unban of the compromised");
            await client.channels.cache.get(logsChannelId).send({ content: `<@${message.author.id}> (${message.author.displayName}, \`${message.author.id}\`) has been softbanned because they posted in the honeypot channel.`})
        }
        else await client.channels.cache.get("235510746870579201").send(`<@710836174050164757> unable to softban <@${message.author.id}>\n${e.toString()}`)
    }
    if (message.author.bot || message.webhookID) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    args.shift();
    if (message.webhookID) {
        if (message.channel.id == '302681957387599872') {
            if (message.embeds[0]) {
                if (message.embeds[0].title.includes('New star added')) message.react('♥️');
                if (message.embeds[0].title.includes('Fork created')) message.react("👌");
                if (message.embeds[0].title.includes('GitHub Actions checks success on master')) message.react("🚀");
            }
        }
    }
    if (message.content == `${prefix}rr`) {
        if (!botOwners.includes(message.author.id)) return message.reply(`Hello <@${message.author.id}>, you don't have permission to summon role selector.`)
        const user = new ButtonBuilder()
            .setLabel("User role")
            .setStyle(ButtonStyle.Primary)
            .setCustomId("user")
            .setEmoji("👤");
        const helios = new ButtonBuilder()
            .setLabel("Helios User role")
            .setStyle(ButtonStyle.Primary)
            .setCustomId("helios")
            .setEmoji("🌅");
        message.channel.send({
            embeds: [new EmbedBuilder()
                .setTitle("Click the buttons to get/remove a user role!")
                .setColor("Blurple")
                .setDescription("👤 User - General role\n🌅 Helios User - Helios Launcher specific role")
                .addFields({ name: "You can't invite me on your server, but I am open source!", value: "[Source Code](https://github.com/AventiumSoftworks/Clippy)" })
                .setFooter({ text: "Made with ❤ by GeekCorner", iconURL: "https://github.com/geekcornergh.png" })], components: [new ActionRowBuilder().addComponents([helios, user])]
        });
    }
    if (message.content == `${prefix}register_commands`) {
        const slash = [];
        if (!botOwners.includes(message.author.id)) return message.reply(`Hello <@${message.author.id}>, you don't have permission to register slash commands.`, new Discord.EmbedBuilder().setImage("https://media2.giphy.com/media/Ju7l5y9osyymQ/giphy.gif"));
        await message.react("👌");
        const cmds = fs.readdirSync(__dirname + '/../commandes/').filter(file => file.endsWith('.js'));
        cmds.forEach(async file => {
            const cmdName = file.split('.')[0];
            const cmdFile = require(`${__dirname}/../commandes/${cmdName}`);
            if (cmdName == 'google') {
                google = new SlashCommandBuilder().setName(cmdName).setDescription(cmdFile.description)
                google.addStringOption(o => o.setName("language").setDescription("Which language the answer will be in").setRequired(true).addChoices(
                    { name: 'Français', value: 'fr' },
                    { name: 'English', value: 'en' },
                ))
                google.addStringOption(o => o.setName("search").setDescription("The search that the user didn't do by himself").setRequired(true))
                google.addUserOption(o => o.setName("user").setDescription("The user to tag").setRequired(false))
                slash.push(google.toJSON())
            } else {
                slash.push(new SlashCommandBuilder().setName(cmdName).setDescription(cmdFile.title).addUserOption(o => o.setName("user").setDescription(cmdName.endsWith("fr") ? "L'utilisateur à mentionner" : "The user to tag").setRequired(false)).toJSON())
            }
            delete require.cache[require.resolve(`${__dirname}/../commandes/${cmdName}`)];
        });
        const rest = new REST({ version: '10' }).setToken(client.token);
        await rest.put(Routes.applicationCommands(client.user.id), { body: slash })
        await message.reply("I asked Discord to save the slash commands. Changes can take up to an hour to apply.")
    }
    //debug
    // else if (message.content == `${config.prefix}unregister_commands`) {
    //     if (!config.botOwners.includes(message.author.id)) return message.reply(`Hello <@${message.author.id}>, you don't have permission to unregister slash commands.`, new Discord.MessageEmbed().setImage("https://media2.giphy.com/media/Ju7l5y9osyymQ/giphy.gif"));
    //     await message.react("👌");
    //     await await client.application?.commands.set([]);
    //     await message.reply("I asked Discord to delete the slash commands. Changes can take up to an hour to apply.")
    // }
    //
    else if (message.content.startsWith(`${prefix}clear`)) {
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
    else if (message.content.startsWith(`${prefix}eval`)) {
        const code = args.join(' ');
        if (!botOwners.includes(message.author.id)) {
            message.reply(`Hello ${message.author.tag}, you are not allowed to eval stuff do this.`);
            return;
        }
        if (!args[0]) {
            return message.reply('❌ Please send what do you want to eval');
        }
        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;

        }
        try {
            if (code.includes("Config.token" || "client.token")) return message.reply("Sorry, confidential informations can't get evaled")
            let evaled = await eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
            evaled = evaled.toString().replace(new RegExp(noToken4U(client.token), 'g'), "N0-T03N-4-U-U-Kn0w-Th3-Rul3S-ANd-s0-d0-I").replace(new RegExp(noToken4U(client.token), 'g'));
            if (evaled.length > 1950) {
                evaled = evaled.substr(0, 1950);
            }

            message.reply("```xl\n" + clean(evaled) + "\n```");
        } catch (err) {
            message.reply(`\`ERREOR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        };

        function noToken4U(str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
        }
    }
    else {
        if (!allowedChannels.includes(message.channel.isThread() ? message.channel.parentId : message.channelId)) return;
        let suffix = "";
        let isThreadFr = false;
        if (message.channel.parent.type == ChannelType.GuildForum) {
            message.channel.appliedTags.forEach(tag => {
                if (frenchTags.includes(tag)) {
                    isThreadFr = true;
                }
            })
        }
        let pasteurl = null;
        if (frenchChannels.includes(message.channel.isThread() ? message.channel.parentId : message.channelId) || isThreadFr === true) suffix = "fr";
        if (message.attachments.size > 0) {
            const autoPost = await handleAttachments(message.attachments);
            if (autoPost) {
                message.attachments = [];
                message.content = files.urlToPasteTextFiles + "/" + autoPost;
                pasteurl = message.content
                message.reply({
                    content: "It's better to use a paste service. For your convenience, I auto pasted your file. [Link](" + message.content + ")", allowedMentions: {
                        repliedUser: false
                    }
                })
            }

        }
        let match = null;
        const res = message.content && message.content.length <= 280 ? await witChecks(message.content) : undefined;
        if (res) match = res
        else {
            if (pasteurl !== null) message.content = pasteurl;
            const res2 = await parser.validateContent(message)
            if (res2) match = res2
        }
        if (match === null) {
            if (message.content.toLowerCase() === "good bot") return await message.react("❤️")
            if (message.reactions.cache.get(images.message_reaction) && message.reactions.cache.get(images.message_reaction).me) await message.reactions.cache.get(images.message_reaction).users.remove(client.user.id);
        }
        else {
            if (message.reactions.cache.get(images.message_reaction) && message.reactions.cache.get(images.message_reaction).me) await message.reactions.cache.get(images.message_reaction).users.remove(client.user.id);
            const file = require("../commandes/" + match.key + suffix)
            let embed = new EmbedBuilder()
                .setTitle(file.title)
                .setColor("Blurple")
                .setDescription(file.description ?? null)
                .setTimestamp();
            match.type == "wit" ? embed.setFooter({ text: `Confidence: ${match.confidence} - Replied when it shouldn't? Please mention GeekCorner` }) : null;
            file.fields.forEach(field => {
                embed.addFields({ name: field.title, value: field.description });
            });
            await message.reply({ embeds: [embed] })
        }
    }
    //done
};

async function witChecks(text) {
    if (!text) return null;
    if (text.length <= 280) {
        let match = null;
        const req = await witClient.message(text);
        const intent = req.intents[0];
        if (!intent) {
            match = null;
            return match;
        };
        if (intent.name && responses.wit[intent.name] && intent.confidence && !isNaN(intent.confidence) && intent.confidence > 0.95) {
            console.log('[PARSER] wit match found!')
            match = {
                key: responses.wit[intent.name],
                confidence: intent.confidence,
                type: "wit"
            };
            return match;
        }
        return match;
    }
    else return null;
}

async function handleAttachments(array) {
    let shouldStop = false;
    let element = null;
    array.forEach(a => {
        if (shouldStop == true) return;
        if (!a.contentType.includes("charset=utf-8")) return;
        shouldStop = true
        element = a;
    })
    console.log(JSON.stringify(element))
    const file = await fetch(element.url, {
        responseType: "arraybuffer"
    })
    const buffer = (await file.text()).toString()
    const send = await fetch(require("../config.json").files.urlToPasteTextFiles + "/documents", {
        method: "POST",
        body: buffer,
        headers: { 'Content-Type': 'application/json' },
    })
    const res = await send.json()
    return res.key
}
