const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Выберите нарушителя и забаньте его')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('Нарушитель')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('Причина бана'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
    async execute(interaction) {
            const target = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') ?? 'Без причины';
    
            await interaction.reply(`Успешно забанен участник @${target.username} по причине: ${reason}`);
            await interaction.guild.members.ban(target);
        },
    };