const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const { clientId, guildId } = require('./config.json');
//const { permAdmin } = require('./permissions/perms.js');

const commands = [];

const folders = fs.readdirSync('./commands/');
for (const module of folders) {
	const commandFiles = fs
		.readdirSync(`./commands/${module}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${module}/${file}`);
		commands.push(command.data.toJSON());
	}
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log('✅ Started refreshing application (/) commands.');

		const response = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{
				body: commands,
			}
		);
		console.log('✅ Successfully reloaded application (/) commands.');

		//Comandos
		console.log('');
		console.log('📚 Command list');
		// Nombres y ID de los comandos
		response.forEach((element) => {
			console.log(`🆔 ${element.id} | 📖 ${element.name} `);
		});
		/*console.log('');

		// Permisos
		await rest.put(
			Routes.guildApplicationCommandsPermissions(clientId, guildId),
			{
				body: permAdmin,
			}
		);
		console.log('✅ Successfully applied permission overwrites.'); */
	} catch (error) {
		console.error(error);
	}
})();
