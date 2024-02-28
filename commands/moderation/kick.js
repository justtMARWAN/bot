const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from this server.")
    .setDefaultPermission(false) // Corrected method name to setDefaultPermission
    .addUserOption((option) => option.setName("target").setDescription("User to kick").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("Reason to kick")),
  async execute(interaction) {
    const { options } = interaction; // Corrected object name to options

    const user = options.getUser("target"); // Corrected method name to getUser
    const reason = options.getString("reason"); // Corrected object name to options and method name to getString

    const member = interaction.guild.members.cache.get(user.id)
    if (!member)
      return interaction.reply({
        embeds: [new EmbedBuilder().setDescription(`This member isn't found, try again.`).setColor("Red")],
        ephemeral: true,
      });

    const errEmbed = new EmbedBuilder() // Corrected class name to MessageEmbed
      .setDescription(`You cannot take action on ${user.username} since they have a higher role than you.`) // Corrected typo in "cannot"
      .setColor("Red"); // Corrected color name to uppercase

    if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.user.id !== interaction.guild.ownerId)
      return interaction.reply({
        embeds: [errEmbed],
        ephemeral: true,
      });

    await member.kick(reason);

    const embed = new EmbedBuilder() // Corrected class name to MessageEmbed
      .setDescription(`Successfully kicked ${user.username}\nReason: **${reason}**`);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
