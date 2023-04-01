module.exports = async (client) => {
	console.log('Hello world!');
	console.info(`Logged in as ${client.user.tag} with ID ${client.user.id}`);
	client.user.setActivity(`my slash commands`, { type: 'WATCHING' });
};