const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('submit')
      .setDescription('Write a test log for submission')
      .addStringOption(option =>
              option.setName('thedate')
                    .setDescription('Date the test took place.')
                    .setRequired(true))
      .addStringOption(option =>
              option.setName('departmentrank')
                    .setDescription('Rank in the Scientific Departmnet.')
                    .setRequired(true))
      .addIntegerOption(option =>
              option.setName('dclass')
                    .setDescription('Number of D-Class tested on.')
                    .setRequired(true))
      .addIntegerOption(option =>
              option.setName('combatives')
                    .setDescription('Number of combatives escorting test.')
                    .setRequired(true))
      .addStringOption(option =>
              option.setName('spectators')
                    .setDescription('The spectators watching the test')
                    .setRequired(true))
      .addStringOption(option =>
              option.setName('scps')
                    .setDescription('The SCP(s) being tested on.')
                    .setRequired(true))
      .addStringOption(option =>
              option.setName('rationale')
                    .setDescription('The rationale for the test.')
                    .setRequired(true))
      .addStringOption(option =>
              option.setName('description')
                    .setDescription('The test described in detail.')
                    .setRequired(true))
      .addStringOption(option =>
              option.setName('conclusion')
                    .setDescription('The conclusion derived from the test.')
                    .setRequired(true))
      .addStringOption(option =>
              option.setName('proof')
                    .setDescription('MUST BE A LINK')
                    .setRequired(true))
      .addStringOption(option =>
              option.setName('notes')
                    .setDescription('Any additional notes.')),
	async execute(client, interaction) {
        const fs = require('fs');
        const tests = require('/app/data/json/tests.json');

        function saveData() {
            fs.writeFile('/app/data/json/tests.json', JSON.stringify(tests), function (err) { 
                if (err) throw err;
            });
        }

        const { MessageEmbed } = require('discord.js');

		    const Date = interaction.options.getString('thedate');
        const Rank = interaction.options.getString('departmentrank');
        const CDs = interaction.options.getInteger('dclass');
        const Combatives = interaction.options.getInteger('combatives');
        const Specs = interaction.options.getString('spectators')
        const SCPs = interaction.options.getString('scps');
        const Rationale = interaction.options.getString('rationale');
        const Conclusion = interaction.options.getString('conclusion');
        const Desc = interaction.options.getString('description');
        const Proof = interaction.options.getString('proof');
        let Notes = interaction.options.getString('notes');
        
    
        if (!Notes) {
          Notes = 'N/A';
        }

        
        if (interaction.channel.id == '722731715407118399') {
          
          const row = new MessageActionRow()
              .addComponents(
                new MessageButton()
                  .setCustomId('testaccept')
                  .setLabel('Accept')
                  .setStyle('SUCCESS'),
                new MessageButton()
                  .setCustomId('testdeny')
                  .setLabel('Deny')
                  .setStyle('DANGER')
              );

          const theEmbed = new MessageEmbed()
              .setColor('#233287')
              .setTitle(interaction.member.displayName + "'s Test")
              .setAuthor(interaction.member.displayName, interaction.user.avatarURL())
              .setDescription("Date of Test: " + Date + "\nDepartment Rank: " + Rank + "\n\n# of Class-D used: " + CDs + "\n\n# of Combatives: " + Combatives + "\n\nSpectators: " + Specs + "\n\nSCP(s) tested on: " + SCPs + "\n\nTest Rationale: " + Rationale + "\n\nThe test described in detail: " + Desc + "\n\nConclusion: " + Conclusion + "\n\nProof: " + Proof + "\n\nNotes: " + Notes)
              .setTimestamp()
          
          const channel = await client.channels.cache.get('874097034288848896');
          const testyf = await channel.send({ embeds: [theEmbed], components: [row] });
          //const testNumber = toString(testyf.id);
          tests.test[testyf.id] = {'user': interaction.user.id};
          fs.writeFile('/app/data/json/tests.json', JSON.stringify(tests), function (err) {if (err) throw err;});
          interaction.reply('Your log was successfully sent.');
        } else {
          interaction.reply({content: "Wrong channel.", ephemeral: true})
        }
    },
};