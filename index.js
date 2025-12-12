// Importation des librairies
const config = require('./src/config.json');
const { GatewayIntentBits, Partials, Client } = require('discord.js');
const fs = require("fs-extra");

const client = new Client({
	intents: [
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildMessageReactions
	]
});

// Handler Events
const eventFiles = fs.readdirSync(__dirname + '/src/events').filter(file => file.endsWith('.js'));
eventFiles.forEach(fEvt => {
	const eventName = fEvt.split('.')[0];
	const event = require(`./src/events/${fEvt}`);
	client.on(eventName, event.bind(null, client));
	delete require.cache[require.resolve(`./src/events/${fEvt}`)];
});


// Login
client.login(config.token);
