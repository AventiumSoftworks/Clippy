//Thanks to rm20 for original code (https://github.com/rm20killer/react-bot/blob/main/commands/malchecker.js)
let psl = require('psl');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const Discord = require("discord.js")
const list = require("./antiNitro/matchList");
const allowlist = require("./antiNitro/allowList");

module.exports = {
    antiworm: async (messa, message, client) => {

        //const messa = message.content.toLowerCase(); 
        let messageContent = message.content
        if (messageContent.includes("https://") || messageContent.includes("http://")) {
            let banned = list.arr;
            let allow = allowlist.arr;

            // Some sort of worm has been spread which uses messages like this to spread.
            const malregex = /(creator|publisher).+(enter|participate).+(beta|closed beta).+(bonus|reward).+(download|install).+(link|file)/i
            const malregex2 = /(steam|csgo|giveaway|giving away|give away).+(giveaway|giving away|give away|discord).+(nitro|closed beta|trades)/i
            const malregex3 = /(join).+(traders|trader).+(earn).+($|£|)/i
            const strx = messa;
            var url = messageContent.match(/\bhttps?:\/\/\S+/gi);
            if (!url) return;
            else {
                for (var i = 0; i < url.length; i++) { //checks all links
                    let URLlower = url[i].toLowerCase();
                    //console.log(url[i])
                    for (var l = 0; l < allow.length; l++) { //real links
                        if (URLlower.includes(allow[l])) {
                            return;
                        }
                    }
                    for (var x = 0; x < banned.length; x++) { //fake link
                        if (URLlower.includes(banned[x])) {
                            trigger(message, client);
                            return;
                        }
                    }

                }
            }
            let mal;
            if ((mal = malregex2.exec(strx)) !== null) { //if missed fake link
                trigger(message, client);
                return;
            }
            if ((mal = malregex3.exec(strx)) !== null) { //if missed fake link
                trigger(message, client);
                return;
            }
            else {
                for (var i = 0; i < url.length; i++) {
                    let URLlower = url[i].toLowerCase();
                    var url2 = URLlower
                    if (similarity('discord.com', psl.get(extractHostname(url2))) > 0.85) {
                        //console.log(url2)
                        channel = client.channels.cache.find(channel => channel.id === "716762885522456677");
                        channel.send("New link `" + url2 + "` ," + similarity('discord.com', psl.get(extractHostname(url2))));
                        trigger(message, client);
                        return;
                    }
                    if (similarity('discord.gift', psl.get(extractHostname(url2))) > 0.85) {
                        //console.log(url2)
                        channel = client.channels.cache.find(channel => channel.id === "716762885522456677");
                        channel.send("New link `" + url2 + "` ," + similarity('discord.gift', psl.get(extractHostname(url2))));
                        trigger(message, client);
                        return;
                    }
                    if (similarity('discord-app.com', psl.get(extractHostname(url2))) > 0.85) {
                        //console.log(url2)
                        channel = client.channels.cache.find(channel => channel.id === "716762885522456677");
                        channel.send("New link `" + url2 + "` ," + similarity('discord-app.com', psl.get(extractHostname(url2))));
                        trigger(message, client);
                        return;
                    }
                    if (similarity('discord.gg', psl.get(extractHostname(url2))) > 0.85) {
                        //console.log(url2)
                        channel = client.channels.cache.find(channel => channel.id === "716762885522456677");
                        channel.send("New link `" + url2 + "` ," + similarity('discord.gg', psl.get(extractHostname(url2))));
                        trigger(message, client);
                        return;
                    }
                    //console.log(similarity('discord.com',psl.get(extractHostname(url))));
                    //console.log(similarity('discord.gift',psl.get(extractHostname(url))));
                }
            }
        }
    },


    antiunderage: function (messa, message, client) {
    }
}


const trigger = async (message, client) => {
    var invite = "`error discord invite not found`"
    var channel = ""
    if (message.guild.id === "211524927831015424") {
        invite = "https://discord.gg/SuNTbdxmr2"
        channel = client.channels.cache.find(channel => channel.id === "283837935244148736");
    }
   else return;
    message.channel.send("<@" + message.author.id + ">'s account might be compromised.");
    let time = message.createdTimestamp

    const embed = new Discord.MessageEmbed()
        .setTitle('A user may be compromised')
        .setColor(0xFF0000)
        .setDescription(message.content)
        .addField('person id', message.author.id)
        .addField("person name ", message.author.tag)
        .addField(`today at`, `<t:${Math.round(time / 1000)}:f>`)
    channel.send({
        content: "<@" + message.author.id + ">",
        embeds: [embed]
    });
    message.delete().catch(error => { console.log(error) });

    message.author.send(`3ADB63D1 \n We noticed you've been compromised by self-spreading malware (a worm) which takes over your account to send download links to this worm to others.\nAs a precaution, the bot has kicked you from the server.\nYou must run a Windows Defender full scan and change your password.\nDon't forget to reach out to Discord by opening a ticket (https://dis.gd/request) so they will help you to get your account back.\nTo join back, use this invite link: ${invite}`)
        .catch(console.error);
    // kick message author
    message.guild.member(message.author).kick('Account compromised');
}

function similarity(s1, s2) {
    if (!s1) { return }
    if (!s2) { return }
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}