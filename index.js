/*
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
*/

// --- Código para subir a replit y UptimeRobot 👆🏻 ---

// --- Inicio del Bot 👇🏻 ---

const fs = require('fs');
require('dotenv').config();

// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	partials: ['MESSAGE', 'CHANNEL'],
});

// Events
console.log('📚 Lista de eventos');
const eventFiles = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}

	console.log(`💾 Evento cargado: ${event.name}`);
}
console.log('');

// Slash Commands
client.slashCmds = new Collection();
console.log('📚 Lista de comandos slash (/)');
const folderSlashCmds = fs.readdirSync('./slash_cmds/');
for (const module of folderSlashCmds) {
	const commandFiles = fs
		.readdirSync(`./slash_cmds/${module}`)
		.filter((file) => file.endsWith('.js'));

	console.log(`🧮 Categoría: ${module}`);
	for (const file of commandFiles) {
		const command = require(`./slash_cmds/${module}/${file}`);
		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
		client.slashCmds.set(command.data.name, command);

		console.log(`📖 ${command.data.name} | ${command.data.description}`);
	}
	console.log('');
}

// Prefix Commands
client.prefixCmds = new Collection();
console.log(`📚 Lista de comandos prefix (${process.env.PREFIX})`);
const folderPrefixCmds = fs.readdirSync('./prefix_cmds/');
for (const module of folderPrefixCmds) {
	const commandFiles = fs
		.readdirSync(`./prefix_cmds/${module}`)
		.filter((file) => file.endsWith('.js'));

	console.log(`🧮 Categoría: ${module}`);
	for (const file of commandFiles) {
		const command = require(`./prefix_cmds/${module}/${file}`);
		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
		client.prefixCmds.set(command.name, command);

		console.log(`📖 ${command.name} | ${command.description}`);
	}
	console.log('');
}

// Login to Discord with your client's token
client.login(process.env.DISCORD_CLIENT_TOKEN);
