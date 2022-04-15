const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('🏓 Responde con Pong!'),
	async execute(interaction) {
		await interaction.reply(
			':ping_pong: `' + interaction.client.ws.ping + ' ms.` desde local.'
		);
	},
};
