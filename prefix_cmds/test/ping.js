module.exports = {
	name: 'ping',
	description: '🏓 Responde con Pong!',
	aliases: [],
	async execute(message, args) {
		message.reply(
			':ping_pong: `' + message.client.ws.ping + ' ms.` desde local.'
		);
	},
};
