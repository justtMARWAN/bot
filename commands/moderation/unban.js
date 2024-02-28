const { SlashCommandBuilder, PermissionFlagsBits, MessageEmbed, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a member from this server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option => 
            option.setName('user_id')
            .setDescription('The ID of banned user.')
            .setRequired(true)
        ),
    async execute(interaction) {
        const { options } = interaction;

        const userId = options.getString('user_id');

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setDescription(`Successfully unbanned user with ID: ${userId} from this guild`)
                .setColor('Green')
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription('Please provide a valid user ID.')
                .setColor('Red')
                .setTimestamp();

            await interaction.reply({
                embeds: [errEmbed],
                ephemeral: true
            });
        }
    }
}
