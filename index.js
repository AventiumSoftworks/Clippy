// Importation des librairies
const config = require('./src/config.json');
const Discord = require('discord.js');
require('discord-reply');
const client = new Discord.Client({ fetchAllMembers: true });
const fs = require('fs-extra');

// Handler Commandes
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
client.cooldowns = cooldowns

const commandfiles = fs.readdirSync('./src/commandes/').filter(file => file.endsWith('.js'));
for (const file of commandfiles) {
	const command = require(`./src/commandes/${file}`);
	client.commands.set(command.name, command);
}

// Handler Events
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
eventFiles.forEach(fEvt => {
	const eventName = fEvt.split(".")[0];
	const event = require(`./src/events/${fEvt}`);
	client.on(eventName, event.bind(null, client));
	delete require.cache[require.resolve(`./src/events/${fEvt}`)];
});


// Login
client.login(config.token);
