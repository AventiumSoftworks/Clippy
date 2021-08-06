const config = require('../config.json');
const fetch = require('node-fetch');
module.exports = async (client) => {
	console.log('Hello world!');
	console.info(`Logged in as ${client.user.tag} with ID ${client.user.id}`);
	client.user.setActivity(`my slash commands`, { type: 'WATCHING' });
	let helios
	let api1
	let nebula
	let api2
	let clippy
	let api3
	helios = await fetch('https://api.github.com/repos/dscalzi/HeliosLauncher');
	api1 = await helios.json();
	nebula = await fetch('https://api.github.com/repos/dscalzi/Nebula');
	api2 = await nebula.json();
	clippy = await fetch('https://api.github.com/repos/GeekCornerGH/Clippy');
	api3 = await clippy.json();
	setInterval(async () => {
		let i = 0;
		if (i == 5) helios = await fetch('https://api.github.com/repos/dscalzi/HeliosLauncher');
		if (i == 5) api1 = await helios.json();
		if (i == 7) nebula = await fetch('https://api.github.com/repos/dscalzi/Nebula');
		if (i == 7) api2 = await nebula.json();
		if (i == 9) clippy = await fetch('https://api.github.com/repos/GeekCornerGH/Clippy');
		if (i == 9) api3 = await clippy.json();
		const status = [
			`and ${client.users.cache.size} members.`,
			`and messages on ${client.channels.cache.size} channels.`,
			'and my source code on https://github.com/GeekCornerGH/Clippy.',
			'and new messages.',
			`and my ping, that have an average of ${client.ws.ping}ms.`,
			`and ${api1.forks} forks on Helios Repo`,
			`and ${api1.stargazers_count} stars on Helios repo`,
			`and ${api2.forks} forks on Nebula repo`,
			`and ${api2.stargazers_count} stars on Nebula repo`,
			`and ${api3.forks} forks on my own repo`,
			`and ${api3.stargazers_count} stars on my own repo`,
		];
		client.user.setActivity(`my slash commands ${status[i++ % status.length]}`, { type: 'WATCHING' });
	}, 10000);
};