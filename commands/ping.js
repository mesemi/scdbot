const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!'),
	async execute(client, interaction) {
    const fs = require('fs')
    const tests = require('/app/.data/tests.json')
    /*
    if (interaction.member.id === '304002526141874187') {
      console.log(tests)
      tests.test = {}
      console.log(tests)
      fs.writeFile('./commands/tests.json', JSON.stringify(tests), function (err) {if (err) throw err;});
    }
    */
		await interaction.reply({content: 'Pong!'});
	},
};
