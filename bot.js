require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();

// Command Handler
fs.readdirSync('./commands').forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
})

// Event Handler
fs.readdirSync('./events/').forEach(file => {
    const eventFunc = require(`./events/${file}`);
    const event = file.split('.')[0];
    try {
        client[eventFunc.once ? 'once' : 'on'](event, (...args) => eventFunc.run(...args, client));
    } catch (error) {
        console.error(error);
    }
})

client.login(process.env.BOT_TOKEN);