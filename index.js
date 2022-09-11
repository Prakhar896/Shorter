const Discord = require('discord.js')
const axios = require('axios');
const newLink = require('./commands/newLink');
const getLinks = require('./commands/getLinks');
const deleteLink = require('./commands/deleteLink');
const qr = require('./commands/qr');
const bot = new Discord.Client();
require('dotenv').config()

const Prefix = 'sh!'

bot.on('ready', () => {
    console.log('Shorter bot is connected!')
    return
})

bot.on('message', async (msg) => {
    if (!msg.content.startsWith("sh!")) {
        return
    } else if (msg.author.bot) {
        return
    }

    if (msg.guild.id != "805723501544603658") {
        msg.reply("Sorry, this bot only works in specific guilds.")
        return
    } else if (msg.author.id != "445816983951507458") {
        msg.reply("Sorry, you are not authorised to use this bot.")
        return
    }

    let args = msg.content.substring(Prefix.length).split(' ');

    switch (args[0]) {
        case 'ping':
            // Reply pong with time taken to reply
            msg.channel.send('pong!').then((resultMessage) => {
                const ping = resultMessage.createdTimestamp - msg.createdTimestamp
                resultMessage.edit(`Pong! Took ${ping}ms to reply.`)
            });
            break;
        case 'new':
            newLink.execute(msg, args, Prefix, bot, process.env.SHORT_API_KEY)
            break;
        case 'getLinks':
            getLinks.execute(msg, args, Prefix, bot, process.env.SHORT_API_KEY, process.env.SHORT_DOMAIN_ID)
            break;
        case 'delete':
            deleteLink.execute(msg, args, Prefix, bot, process.env.SHORT_API_KEY, process.env.SHORT_DOMAIN_ID)
            break;
    };
    return
})

bot.login(process.env.BOT_TOKEN)