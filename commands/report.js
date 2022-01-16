const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('report')
      .setDescription('Submit a RA report.')
      .addStringOption(option =>
            option.setName('date')
                  .setDescription('Date of writing.')
                  .setRequired(true))
      .addStringOption(option =>
            option.setName('clearance')
                  .setDescription('Your current security clerance.')
                  .setRequired(true))
      .addStringOption(option =>
            option.setName('questionone')
                  .setDescription('What object class can a Junior Researcher test on?')
                  .setRequired(true))
      .addStringOption(option =>
            option.setName('questiontwo')
                  .setDescription('How many Security Operatives are required for a Safe Class test?')
                  .setRequired(true))
      .addStringOption(option =>
            option.setName('questionthree')
                  .setDescription('What is the format to request a Class - D from the Class - D Containment Zone?')
                  .setRequired(true))
      .addStringOption(option =>
            option.setName('questionfour')
                  .setDescription('What should you do if a breach occurs during your test?')
                  .setRequired(true))
      .addStringOption(option =>
            option.setName('questionfive')
                  .setDescription('What is your personal goal as a researcher?')
                  .setRequired(true))
      .addStringOption(option =>
            option.setName('questionsix')
                  .setDescription('What SCP is your favorite? Describe it in 2-3 sentences.')
                  .setRequired(true))
      .addStringOption(option =>
            option.setName('questionseven')
                  .setDescription('Have you read the Code of Ethics?')
                  .setRequired(true))
      .addStringOption(option =>
            option.setName('questioneight')
                  .setDescription('Have you worked for a different Scientific Department within the SCP Genre before? If so, which one?')
                  .setRequired(true)),
	async execute(client, interaction) {
        const fs = require('fs');
        const reports = require('/app/.data/reports.json');

        function saveDatat() {
            fs.writeFile('/app/.data/reports.json', JSON.stringify(reports), function (err) {
                if (err) throw err;
            });
        }

        const { MessageEmbed } = require('discord.js');

		    const Date = interaction.options.getString('date');
        const Clearance = interaction.options.getString('clearance');
        const QONE = interaction.options.getString('questionone');
        const QTWO = interaction.options.getString('questiontwo');
        const QTHREE = interaction.options.getString('questionthree')
        const QFOUR = interaction.options.getString('questionfour');
        const QFIVE = interaction.options.getString('questionfive');
        const QSIX = interaction.options.getString('questionsix');
        const QSEVEN = interaction.options.getString('questionseven');
        const QEIGHT = interaction.options.getString('questioneight');


        const rowr = new MessageActionRow()
              .addComponents(
                new MessageButton()
                  .setCustomId('raaccept')
                  .setLabel('Accept')
                  .setStyle('SUCCESS'),
                new MessageButton()
                  .setCustomId('radeny')
                  .setLabel('Deny')
                  .setStyle('DANGER')
              );

        if (interaction.channel.id == '722731729600905226') {

          const theEmbed = new MessageEmbed()
              .setColor('#233287')
              .setTitle('RA Report by ' + interaction.member.displayName)
              .setAuthor(interaction.member.displayName, interaction.user.avatarURL())
              .setDescription("**Date of Proposal:** " + Date + "\n**Clearance:** " + Clearance + "\n\n**1. What Object Class can a Junior Researcher test on? :**" + QONE + "\n\n**2. How many Security Operatives are required for a Safe Class test?  :** " + QTWO + "\n\n**3. What is the format to request Class-D from the Class-D Containment Zone? :** " + QTHREE + "\n\n**4. What should you do if a breach occurs during your test? :** " + QFOUR + "\n\n**5. What is your personal goal as a researcher?  :** " + QFIVE + "\n\n**6. What SCP would you say is your favorite? Describe it in 2-3 sentences.  :** " + QSIX + "\n\n**7. Have you read the Code of Ethics? :** " + QSEVEN + "\n\n**8. Have you worked for a different Scientific Department within the SCP Genre before? If so, which one? :** " + QEIGHT)
              .setTimestamp()

          const channel = await client.channels.cache.get('874097034288848896');
          const testyr = await channel.send({ embeds: [theEmbed], components: [rowr] });

          reports.report[testyr.id] = {'user': interaction.user.id};

          fs.writeFile('/app/.data/reports.json', JSON.stringify(reports), function (err) {if (err) throw err;});
          interaction.reply('Your report was successfully sent.');
        } else {
          interaction.reply({content: "Wrong channel.", ephemeral: true})
        }
    },
};
