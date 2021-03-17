const config = require('../config.json');
module.exports = {
	name: 'eval',
	description: 'Eval code.',
	aliases: [],
	usage: '<code to use with eval>',
	cooldown: 5,
	async execute(client, message, args) {
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
			if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
			else {return text;}
		};
		try {
			let evaled = eval(code);

			if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}

			message.lineReply(clean(evaled), { code: 'xl' });
		}
		catch (err) {
			message.lineReply(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	},
};