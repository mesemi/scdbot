const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs')
const tests = require('/app/.data/tests.json');
const reports = require('/app/.data/reports.json')
const data = require('/app/.data/data.json')

module.exports = {
  "name": "testdeny",

	async execute(client, interaction) {
    const filter = m => m.author.id.includes(interaction.member.id);
    const collector = interaction.channel.createMessageCollector({ time: 30000 });
    const swagballs = await interaction.channel.messages.fetch(interaction.message.id);

    await swagballs.edit({content: "Test denied by " + interaction.member.nickname + ' :x:', components: []})
    interaction.deferReply({ephemeral: true})
    const channel = await client.channels.cache.get('874097034288848896');
    const fchannel = await client.channels.cache.get('731984961480949762');

		collector.on('collect', m => {
      fchannel.send("<@" + tests.test[interaction.message.id].user + ">, your test has been denied by <@" + interaction.member.id + ">, with feedback: " + m.content)
      tests.test[interaction.message.id] = {}
      fs.writeFile('/app/.data/tests.json', JSON.stringify(tests), function (err) {if (err) throw err;});
      interaction.editReply("Done!")
      collector.stop();
    });
    collector.on('end', collected => {
      if (collected.size === 0) {
        fchannel.send("<@" + tests.test[interaction.message.id].user + ">, your test has been denied by <@" + interaction.member.id + ">")
        tests.test[interaction.message.id] = {}
        fs.writeFile('/app/.data/tests.json', JSON.stringify(tests), function (err) {if (err) throw err;});
        interaction.editReply("Done!")
    }});
	},
};
