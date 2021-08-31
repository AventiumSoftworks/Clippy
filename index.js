// Importation des librairies
const config = require('./src/config.json');
const Discord = require('discord.js');
const fs = require("fs-extra");

const client = new Discord.Client({ fetchAllMembers: true, intents: [32767] });


// Commandes slash
//require("./src/interactions/slash")(client);
//require("./src/interactions/buttons")(client);


// Handler Events
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
eventFiles.forEach(fEvt => {
	const eventName = fEvt.split('.')[0];
	const event = require(`./src/events/${fEvt}`);
	client.on(eventName, event.bind(null, client));
	delete require.cache[require.resolve(`./src/events/${fEvt}`)];
});


// Login
client.login(config.token);
