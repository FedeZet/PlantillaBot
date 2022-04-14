# PlantillaBot

## 🤖 Plantilla para Bots de Discord

Construida con la documentación https://discordjs.guide/#before-you-begin. Para más información dirigirse a esa guía.

## 🚀 Empezando

### 🔧 Instalación

Pasos a seguir para instalar la plantilla:

1. Clonar el repositorio o descargar la última versión desde [GitHub](https://github.com/FedeZet/PlantillaBot/releases) (deberá descomprimir el archivo zip).

```bash
git clone https://github.com/FedeZet/PlantillaBot.git
```

Después de descargar la plantilla puede renombrarla a un nombre que le guste (la del bot).

2. Instalar los paquetes necesarios:

Con este comando se instalarán los paquetes necesarios para que funcione la plantilla

```bash
npm install
```

3. Completar los datos de configuración en el archivo `.env`, deberá tener el siguiente contenido:

Estos datos son necesarios para que el bot funcione correctamente. Deberá crear el archivo `.env` en la raíz del proyecto. El archivo deberá tener el siguiente contenido:

```
# Discord Bot
DISCORD_CLIENT_TOKEN=[token del bot]
DISCORD_CLIENT_ID=[id del bot]

# Guild
DISCORD_GUILD_ID=[id del servidor/gremio de Discord]
```

_Agregar los datos sin corchetes rectos []_

Este contenido puede obtenerlo en el archivo `.env.example` que se encuentra en la raíz del proyecto. También puede borrar la extensión `.example` y renombrar el archivo a `.env`.

## ⚙ Uso

Después de configurar el archivo `.env`. Podemos continuar con la ejecución del bot.

1. Primero debemos desplegar los comandos (/) del bot a Discord. Esto se debe realizar cada vez que creamos un comando o modificamos la estructura del comando.

💡 Un ejemplo de una estructura de comando sería:

```js
// Archivo: ./commands/test/ping.js

const { SlashCommandBuilder } = require('@discordjs/builders'); // Importamos el constructor de comandos

module.exports = {
	data: new SlashCommandBuilder() // Constructor del comando. Cada vez que modifiquemos algo de aquí, debemos desplegarlo a Discord. O sea, debemos ejecutar npm run deploy.
		.setName('ping') // Nombre del comando.
		.setDescription('🏓 Responde con Pong!'), // Descripción del comando.
	async execute(interaction) {
		// Acción del comando.

		await interaction.reply(
			':ping_pong: `' + interaction.client.ws.ping + ' ms.` desde local.'
		); // Esto responde un mensaje al usuario.
	},
};
```

_Para más información sobre el constructor de comandos, dirigirse a la documentación de Discord.js [Slash commands](https://discordjs.guide/interactions/slash-commands.html#slash-commands)._

Para desplegar los comandos a Discord, debemos ejecutar el siguiente comando:

```bash
npm run deploy

# También puede utilizar este otro comando:

node deploy-commands.js
```

2. Ahora podemos ejecutar el bot.

```bash
npm start

# También puede utilizar este otro comando:

node .
```

Y listo, el bot está listo para funcionar.
