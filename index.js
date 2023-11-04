const Discord = require('discord.js');

const client = new Discord.Client({ intents: [
	Discord.GatewayIntentBits.Guilds 
]});

let token = 'Token'

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const rest = new REST({ version: '10' }).setToken(token);

client.commands = new Discord.Collection();
let data = []

const folders = fs.readdirSync(`./commands/`);
for (const folder of folders) {
  const files = fs.readdirSync(`./commands/${folder}`)
  for (const file of files) {
    const cmdfile = require(`./commands/${folder}/${file}`);
    data.push({ name: cmdfile.name, description: cmdfile.description, options: cmdfile.options })
    client.commands.set(cmdfile.name, cmdfile);
  }
}

client.once(Discord.Events.ClientReady, async client => {
	console.log(`Bot ${client.user.username} is working!`)
	await rest.put(Routes.applicationCommands(client.user.id), { body: data } );
});

client.on(Discord.Events.InteractionCreate, async interaction => {
	if (!interaction.isCommand() && !interaction.isAutocomplete()) return;
	await client.commands.get(interaction.commandName).execute(interaction)
})

client.login(token);