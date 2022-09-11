const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'deleteLink',
    description: 'Deletes a short link based on a link ID string using the Short.io API.',
    async execute(msg, args, Prefix, bot, APIToken, domainID) {
        // Check if the user has provided a link ID string
        if (args.length < 2) {
            msg.reply("Please provide a link ID string to delete.")
            return
        }

        const options = {
            headers: {
                'content-type': 'application/json',
                authorization: APIToken
            }
        };

        axios.delete(`https://api.short.io/links/${args[1]}`, options)
            .then(function (response) {
                if (response.data.success == true) {
                    msg.reply(`Deleted link with ID string ${args[1]} successfully!`)
                    return
                }
            }).catch(function (response) {
                msg.reply(`Error: ${response}`)
                return
            });
    }
}