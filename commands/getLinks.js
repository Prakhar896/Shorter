const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'getLinks',
    description: 'Gets all the created short links from the Short.io API.',
    async execute(msg, args, Prefix, bot, APIToken, domainID) {

        axios.get('https://api.short.io/api/links', {
            params: {
                domain_id: domainID,
                limit: '150',
                offset: '0'
            },
            headers: {
                accept: 'application/json',
                authorization: APIToken
            }
        })
            .then(function (response) {
                msg.reply(`**Retreived ${response.data.count} links successfully! Showing now...**`)
                response.data.links.forEach(link => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(link.shortURL)
                        .setURL(link.shortURL)
                        .setDescription(link.originalURL)
                        .addField('Link ID String', link.idString)
                        .setFooter(`Created at ${link.createdAt}`)
                        .setColor('#00ff00')
                    msg.channel.send(embed)
                });
            })
            .catch(function (response) {
                msg.reply(`Error: ${response}`)
                return
            });
    }
}