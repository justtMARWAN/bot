const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { InteractionOptionResolver, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member from this server.')
        .addUserOption(option => 
            option.setName('target')
            .setDescription('The user to ban.')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('reason')
            .setDescription('Reason to ban.')
        ),
    async execute(interaction) {
        const { options } = interaction;

        const user = options.getUser('target');
        const reason = options.getString('reason');

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`You cannot take action on ${user.username} since they have a higher role than you.`)
            .setColor("Red");

        if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.user.id !== interaction.guild.ownerId)
            return interaction.reply({
                embeds: [errEmbed],
                ephemeral: true,
            });

        await member.ban({ reason });

        const embed = new EmbedBuilder()
            .setDescription(`Successfully banned ${user.username}\nReason: **${reason}**`)
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    }        
}
