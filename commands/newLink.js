const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'newLink',
    description: 'Creates a new short link using the Short.io API.',
    async execute(msg, args, Prefix, bot, APIToken) {
        // Check if the user has provided a link
        if (args.length < 2) {
            msg.reply("Please provide a link to shorten.")
            return
        }

        const destLink = args[1]

        // Check if destination link is valid
        if (!destLink.startsWith("http://") && !destLink.startsWith("https://")) {
            msg.reply("Please provide a valid link to shorten.")
            return
        }

        // Create short link
        const options = {
            method: 'POST',
            url: 'https://api.short.io/links',
            headers: {
                authorization: process.env.SHORT_API_KEY
            },
            data: {
                originalURL: destLink,
                domain: process.env.SHORT_DOMAIN
            },
            responseType: 'json'
        };

        axios(options)
            .then(function (response) {
                // Send short link to user
                msg.reply(`Link shortened to ${response.data.shortURL} successfully! Link ID String: ${response.data.idString}`)
                return
            })
            .catch(function (error) {
                // Send error message to user
                msg.reply(`Error: ${error}`)
                return
            })
    }
}