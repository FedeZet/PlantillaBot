const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
//const { permAdmin } = require('./permissions/perms.js');

const commands = [];

// Es necesario crear subcarpetas (ponga nombre de categorias) dentro de la
// carpeta commands para que funcione. Ej.: slash_cmds/{categoria}/{nombre del comando}.js
const folder = fs.readdirSync('./slash_cmds/');
for (const module of folder) {
	const commandFiles = fs
		.readdirSync(`./slash_cmds/${module}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./slash_cmds/${module}/${file}`);
		commands.push(command.data.toJSON());
	}
}

const rest = new REST({ version: '9' }).setToken(
	process.env.DISCORD_CLIENT_TOKEN
);

(async () => {
	try {
		console.log('✅ Started refreshing application (/) commands.');

		//Comandos
		const response = await rest.put(
			Routes.applicationGuildCommands(
				process.env.DISCORD_CLIENT_ID,
				process.env.DISCORD_GUILD_ID
			),
			{
				body: commands,
			}
		);
		console.log('✅ Successfully reloaded application (/) commands.');

		console.log('\n📚 Command list');
		// ID y nombres de los comandos
		response.forEach((element) => {
			console.log(`🆔 ${element.id} | 📖 ${element.name} `);
		});
		console.log('');

		/*
		// Permisos
		await rest.put(
			Routes.guildApplicationCommandsPermissions(
				process.env.DISCORD_CLIENT_ID,
				process.env.DISCORD_GUILD_ID
			),
			{
				body: permAdmin,
			}
		);
		console.log('✅ Successfully applied permission overwrites.'); */
	} catch (error) {
		console.error(error);
	}
})();
