const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('get a breif summary on a user from this guild')
    .addUserOption((option) => 
        option.setName('user')
        .setDescription('select a user')
        .setRequired(true)
    ),
    async  execute(interaction) {
        let user = interaction.option.getUser('user')

        const embed = new EmbedBuilder()
        .setColor('Aqua')
        .setThumbnail(`${user.displayAvatarURL()}`)
        .setAuthor({
                name: user.tag,
                iconURL: user.displayAvatarURL(),
            })
            .addFields({
                name: 'account created at',
                value: `${user.createdAt.toLocaleString()}`,
                inline: true,
            },
            {
                name: 'joined server at',
                value: `${interaction.guild.joinedAt.toLocaleString()}`,
                inline: true,
            },
            {
                name: 'user ID',
                value: `${user.id}`,
                inline: true,
            },
            {
                name: 'username',
                value: `${user.username}`,
                inline: true,
            },
            {
                name: 'is the user a bot',
                value: `${user.bot}`,
                inline: true,
            })
        .setFooter({
            text: 'the data gets changed according to the user',
        });

        await interaction.reply({
            embeds: [embed]
        });
        }
}
