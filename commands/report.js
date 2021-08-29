module.exports = {
	name: 'report',
	description: 'Submit a RA report',
    options: [
		{
            name: 'date',
            type: "STRING",
            description: "Date of writing.",
            required: true,
		},
        {
            name: 'clearance',
            type: 'STRING',
            description: 'Your currenty security clearance.',
            required: true,
        },
        {
            name: 'questionone',
            type: 'STRING',
            description: 'What Object Class can a Junior Researcher test on?',
            required: true,
        },
        {
            name: 'questiontwo',
            type: 'STRING',
            description: 'How many Security Operatives are required for a Safe Class test?',
            required: true,
        },
        {
            name: 'questionthree',
            type: 'STRING',
            description: 'What is the format to request Class-D from the Class-D Containment Zone?',
            required: true,
        },
        {
            name: 'questionfour',
            type: 'STRING',
            description: 'What should you do if a breach occurs during your test?',
            required: true,
        },
        {
            name: 'questionfive',
            type: 'STRING',
            description: 'What is your personal goal as a researcher? ',
            required: true,
        },
        {
            name: 'questionsix',
            type: 'STRING',
            description: 'What SCP would you say is your favorite? Describe it in 2-3 sentences. ',
            required: true,
        },
        {
            name: 'questionseven',
            type: 'STRING',
            description: 'Have you read the Code of Ethics?',
            required: true,
        }
	],
	async execute(interaction) {
        const fs = require('fs');
        const reports = require('./reports.json');

        function saveDatat() {
            fs.writeFile('./commands/reports.json', JSON.stringify(reports), function (err) { 
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

        const index = require('/app/index.js');

        const reportNumber = Math.floor(Math.random() * 10000);
        if (interaction.channel.id == '722731729600905226') {
          reports.report[reportNumber] = {'user': interaction.user.id};
          saveDatat();

          const theEmbed = new MessageEmbed()
              .setColor('#233287')
              .setTitle('RA Report ID#' + reportNumber)
              .setAuthor(interaction.member.displayName, interaction.user.avatarURL())
              .setDescription("**Date of Proposal:** " + Date + "\n**Clearance:** " + Clearance + "\n\n**1. What Object Class can a Junior Researcher test on? :**" + QONE + "\n\n**2. How many Security Operatives are required for a Safe Class test?  :** " + QTWO + "\n\n**3. What is the format to request Class-D from the Class-D Containment Zone? :** " + QTHREE + "\n\n**4. What should you do if a breach occurs during your test? :** " + QFOUR + "\n\n**5. What is your personal goal as a researcher?  :** " + QFIVE + "\n\n**6. What SCP would you say is your favorite? Describe it in 2-3 sentences.  :** " + QSIX + "\n\n**7. Have you read the Code of Ethics? :** " + QSEVEN)
              .setTimestamp()
          index.channel.send({ embeds: [theEmbed] });
          interaction.reply('Your report was successfully sent.');
        } else {
          interaction.reply({content: "Wrong channel.", ephemeral: true})
        }
    },
};