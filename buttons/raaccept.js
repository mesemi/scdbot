const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs')
const tests = require('/app/.data/tests.json');
const reports = require('/app/.data/reports.json')
const data = require('/app/.data/data.json')

module.exports = {
  "name": "raaccept",

	async execute(client, interaction) {
    const filter = m => m.author.id.includes(interaction.member.id);
    const collector = interaction.channel.createMessageCollector({ time: 30000 });
    const swagballs = await interaction.channel.messages.fetch(interaction.message.id);

    await swagballs.edit({content: "Report accepted by " + interaction.member.nickname + ' ✅', components: []})
    interaction.deferReply({ephemeral: true})
    const channel = await client.channels.cache.get('874097034288848896');
    const fchannel = await client.channels.cache.get('731984961480949762');

		collector.on('collect', m => {
      fchannel.send("<@" + reports.report[interaction.message.id].user + ">, your RA report has been accepted by <@" + interaction.member.id + ">, with feedback: " + m.content)
      reports.test[interaction.message.id] = {}
      fs.writeFile('/app/.data/reports.json', JSON.stringify(reports), function (err) {if (err) throw err;});
      interaction.editReply("Done!")
      collector.stop();
    });
    collector.on('end', collected => {
      if (collected.size === 0) {
        fchannel.send("<@" + reports.report[interaction.message.id].user + ">, your RA report has been accepted by <@" + interaction.member.id + ">")
        reports.report[interaction.message.id] = {}
        fs.writeFile('/app/.data/reports.json', JSON.stringify(reports), function (err) {if (err) throw err;});
        interaction.editReply("Done!")
    }});
	},
};
