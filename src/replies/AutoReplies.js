// https://github.com/AVMG20/smart-support-bot/blob/main/classes/ContentValidator.js
const { Message, MessageAttachment } = require('discord.js')
const Tesseract = require('tesseract.js');
const { urls, images, hastebinToken, witToken } = require(__dirname + '/../config.json')
const urlExpression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/mg;
const { Wit } = require("node-wit");
const witClient = new Wit({ accessToken: witToken });



class ContentValidator {
	/**
	 * @param {array} responses
	 */
	constructor(responses) {
		this.responses = responses;
	}

	/**
	 * @description determine the content of the message
	 * @param {Message} message
	 * @return {Promise<{key: RegExp, content: string}|null>}
	 */
	validateContent(message) {
		return new Promise(async (resolve, reject) => {
			if (urls.allowed_urls.findIndex(url => message.content.startsWith(url)) !== -1) {
				if (message.content.match(urlExpression)) {
					if (message.content.startsWith(urls.allowed_urls[0])) {
						let id = message.content.split('/').pop()
						message.content = `${urls.allowed_urls[0]}/raw/${id}`
					}
					if (message.content.includes("hastebin.com")) message.content = `https://hastebin.com/raw/${message.content.split('/').pop()}`
					let text = await this.parseUrl(message);
					return resolve(this.checkMatches(text))
				}
			}

			//check if message has image
			if (message.attachments.size > 0) {
				let attachment = message.attachments.first()
				if (attachment.size < images.max_size_in_bytes && this.attachIsImage(attachment)) {
					let text = await this.parseImage(message).catch(reject)
					return resolve(this.checkMatches(text));
				}
			}

			//treat message as regular text message
			return resolve(this.checkMatches(message.content))
		})
	}

	/**
	 * @description check if message attachment is an image
	 * @param {MessageAttachment} msgAttach
	 */
	attachIsImage(msgAttach) {
		let url = msgAttach.url;
		return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
	}

	/**
	 * @description parse image to text, using tesseract
	 * @param {Message} message
	 * @return {Promise<string>}
	 */
	parseImage(message) {
		let attachment = message.attachments.first()

		return new Promise(async (resolve, reject) => {
			console.log('[PARSER] parsing image to text.')
			await message.react(images.message_reaction)

			await Tesseract.recognize(attachment.url, "eng").then(async ({ data: { text } }) => {
				return resolve(text);
			})
				.catch(reject)
		})

	}

	/**
	 * @param {Message} message
	 * @return {Promise<string>}
	 */
	async parseUrl(message) {
		console.log('[PARSER] parsing url to text.')
		let response
		if (!message.content.includes("hastebin.com")) response = await fetch(message.content, {
			maxContentLength: urls.max_content_size_in_bytes,
		})
		else response = await fetch(message.content, {
			maxContentLength: urls.max_content_size_in_bytes,
			headers: {
				"Authorization": "bearer " + hastebinToken
			}
		})
		await message.react(images.message_reaction)
		return await response.text();
	}

	/**
	 * @description search for a match in the provided text, return the response or null
	 * @param {string} text
	 * @return {{key: RegExp, content: string}|null}
	 */
	async checkMatches(text) {
		console.log('[PARSER] text: \n' + text)
		/*let index = this.responses.findIndex(response => text.match(response.key))

		if (index !== -1) {
			console.log('[PARSER] match found!')
			return this.responses[index];
		} else {
			console.log('[PARSER] no match found.')
			return null;
		}*/
		const req = await witClient.message(text);
		if (!req.intents) return;
		const intent = req.intents[0];
		if (!intent) return
		if (intent.confidence && !isNaN(intent.confidence) && intent.confidence < 0.9) return;
		return {
			key: this.responses[intent.name],
			confidence: intent.confidence
		};

	}
}


module.exports = ContentValidator;