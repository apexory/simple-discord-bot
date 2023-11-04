const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping!',
    options: [],
    async execute(interaction) {

    await interaction.reply({ content: 'Pong!', ephemeral: false });
    }
}