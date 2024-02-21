const { Client, GatewayIntentBits, Partials, IntentsBitField, Collection } = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { user, Message, GuildMember, ThreadMember, channel } = Partials;

const { loadEvents } = require("./handlers/eventHandlers.js");
const { loadCommands } = require("./handlers/commandHandler.js");

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [user, Message, GuildMember, ThreadMember],
});

client.commands = new Collection();
client.config = require("./config.json");

client.login(client.config.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});
