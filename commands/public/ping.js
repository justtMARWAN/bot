const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('replies with pong'),
    execute(interaction, client) {
        interaction.reply({
            content: `pong! \n**${client.ws.ping}** ms.`
        });
    },
};