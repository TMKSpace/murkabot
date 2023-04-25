const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Выберите нарушителя и кикните его')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('Нарушитель')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('Причина кика'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
    async execute(interaction) {
            const target = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') ?? 'Без причины';
    
            await interaction.reply(`Успешно кикнут участник @${target.username} по причине: ${reason}`);
            await interaction.guild.members.kick(target);
        },
    };