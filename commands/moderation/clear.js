const { SlashCommandBuilder, PermissionsBitField, MessageEmbed, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear a specific amount of messages from a target or channel.')
        .setDefaultMemberPermissions(PermissionsBitField.ManageMessages)
        .addIntegerOption(option => 
            option.setName('amount')
            .setDescription('Amount of messages to clear.')
            .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user')
            .setDescription('User to clear messages from.')
            .setRequired(false)
        ),    

    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger('amount');
        const target = options.getUser('user');

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        const res = new EmbedBuilder();

        if (target) {
            let i = 0;
            const filtered = [];

            await messages.filter((msg) => {
                if (msg.author.id === target && i < amount) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Successfully deleted ${messages.size} messages from ${target}`);
                interaction.reply({
                    embeds: [res]
                });
            });

        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Successfully deleted ${messages.size} messages from this channel`);
                interaction.reply({
                    embeds: [res]
                });
            });
        }
    }
}
