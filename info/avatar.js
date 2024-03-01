const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get a user's avatar!")
    .addUserOption((option) => option.setName("user").setDescription("The user's avatar to get").setRequired(true)),

  async execute(interaction) {
    const { channel, member, client, options } = interaction;
    let user = interaction.options.getUser("user") || interaction.member;
    let userAvatar = user.displayAvatarURL({ size: 1024 });

    const embed = new EmbedBuilder().setColor("Blue").setTitle(`${user.tag}'s Avatar`).setImage(`${userAvatar}`).setTimestamp();

    const button = new ButtonBuilder()
      .setLabel("Avatar link")
      .setStyle(ButtonStyle.Link)
      .setURL(`${user.avatarURL({ size: 1024 })}`); // corrected line

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
