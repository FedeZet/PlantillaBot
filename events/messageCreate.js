module.exports = {
	name: 'messageCreate',
	async execute(message) {
		const prefix = process.env.PREFIX;

		if (message.author.bot) return;

		if (!message.content.startsWith(prefix)) return;

		let args = message.content.slice(prefix.length).trim().split(/ +/g);

		let command = args.shift().toLowerCase();

		let cmd = message.client.prefixCmds.find(
			(cmd) => cmd.name === command || cmd.aliases.includes(command)
		);

		if (cmd) {
			try {
				await cmd.execute(message, args);
			} catch (error) {
				console.error(error);
				await message.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
		}
	},
};
