// https://github.com/AVMG20/smart-support-bot/blob/main/classes/ContentValidator.js
const { Message, MessageAttachment } = require('discord.js')
const Tesseract = require('tesseract.js');
const { urls, images, hastebinToken } = require(__dirname + '/../config.json')
const urlExpression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/mg;
const RegexParser = require("regex-parser");



class ContentValidator {
	/**
	 * @param {array} responses
	 */
	constructor(responses) {
		this.responses = {
			wit: responses.wit,
			regex: responses.regex.map(r => {
				return {
					key: RegexParser(r.key),
					content: r.content
				}
			})
		};
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
					console.log(message.content)
					let id = message.content.split('/').pop()
					message.content = `${urls.allowed_urls[urls.allowed_urls.findIndex(url => message.content.startsWith(url))]}/raw/${id}`
					console.log(message.content)
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
		let match = null;
		let index = -1;
		this.responses.regex.forEach((response, i) => {
			const test = text.match(response.key);
			if (test) {
				match = response.content;
				index = i;
			}
		});
		if (index !== -1) {
			console.log('[PARSER] match found!');
			match = {
				key: match,
				type: "regex"
			}
			return match;
		} else {
			console.log('[PARSER] no match found.');
			match = null
			return match;
		}
	}
}

module.exports = ContentValidator;