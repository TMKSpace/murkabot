const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kotya')
		.setDescription('kotya loh'),
	async execute(interaction) {
		await interaction.reply('@Котя лох блеять');
	},
};