const { images, prefix, botOwners, allowedChannels, frenchChannels, frenchTags } = require("../config.json");
const responses = require("./../replies/replies.json");
const messageParser = require("../replies/AutoReplies")
const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, REST, Routes, SlashCommandBuilder, ButtonStyle, ChannelType } = require("discord.js");
const antiw = require("../antiNitro");
const fs = require("node:fs");
const parser = new messageParser(responses)
module.exports = async (client, message) => {
    if (message.author.bot || message.webhookID) return;
    const messa = message.content.toLowerCase();
    antiw.antiworm(messa, message, client);
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    args.shift();
    if (message.webhookID) {
        if (message.channel.id == '302681957387599872') {
            if (message.embeds[0]) {
                if (message.embeds[0].title.includes('New star added')) message.react('♥️');
                if (message.embeds[0].title.includes('Fork created')) message.react("👌");
                if (message.embeds[0].title.includes('GitHub Actions checks success on master')) message.react("✅");
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
                .addFields({ name: "You cann't invite me on your server, but I am open source!", value: "[Source Code](https://github.com/AventiumSoftworks/Clippy)" })
                .setFooter({ text: "Made with ❤ by GeekCornerD#8010", iconURL: "https://cdn.discordapp.com/avatars/710836174050164757/a_46c1958617a1d46fa46fab0663965ff8.gif?size=1024" })], components: [new ActionRowBuilder().addComponents([helios, user])]
        });
    }
    if (message.content == `${prefix}register_commands`) {
        const slash = [];
        if (!botOwners.includes(message.author.id)) return message.reply(`Hello <@${message.author.id}>, you don't have permission to register slash commands.`, new Discord.MessageEmbed().setImage("https://media2.giphy.com/media/Ju7l5y9osyymQ/giphy.gif"));
        await message.react("👌");
        const cmds = fs.readdirSync(__dirname + '/../commandes/').filter(file => file.endsWith('.js'));
        cmds.forEach(async file => {
            const cmdName = file.split('.')[0];
            const cmdFile = require(`${__dirname}/../commandes/${cmdName}`);
            slash.push(new SlashCommandBuilder().setName(cmdName).setDescription(cmdFile.title).addUserOption(o => o.setName("user").setDescription(cmdName.endsWith("fr") ? "L'utilisateur à mentionner" : "The user to tag").setRequired(false)).toJSON())
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

            message.reply("```xl\n" + clean(evaled)+ "\n```");
        } catch (err) {
            message.reply(`\`ERREOR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        };

        function noToken4U(str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
        }
    }
    else {
        if(!allowedChannels.includes(message.channel.isThread()? message.channel.parentId : message.channelId)) return;
        let suffix = "";
        let isThreadFr = false;
        if(message.channel.parent.type==ChannelType.GuildForum) {
            message.channel.appliedTags.forEach(tag => {
                if(frenchTags.includes(tag)) {
                    isThreadFr=true;
                }
            })
        }
        if (frenchChannels.includes(message.channel.isThread()? message.channel.parentId : message.channelId)||isThreadFr===true) suffix="fr"; 
        let res = await parser.validateContent(message)
        if (!res) {
            if (messa === "good bot") return await message.react("❤️")
            if (message.reactions.cache.get(images.message_reaction) && message.reactions.cache.get(images.message_reaction).me) await message.reactions.cache.get(images.message_reaction).users.remove(client.user.id);
        }
        else {
            if (message.reactions.cache.get(images.message_reaction) && message.reactions.cache.get(images.message_reaction).me) await message.reactions.cache.get(images.message_reaction).users.remove(client.user.id);
            const file = require("../commandes/" + res.key + suffix)
            let embed = new EmbedBuilder()
                .setTitle(file.title)
                .setColor("Blurple")
                .setDescription(file.description ?? null)
                .setTimestamp()
                .setFooter({text: `Confidence: ${res.confidence} - Replied when it shouldn't? Please mention GeekCorner`});
            file.fields.forEach(field => {
                embed.addFields({ name: field.title, value: field.description });
            });
            await message.reply({ embeds: [embed] })
        }
    }
    //done
};
