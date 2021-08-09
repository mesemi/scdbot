module.exports = {
	name: 'submit',
	description: 'Write a test log for submission.',
    options: [
		{
            name: 'thedate',
            type: "STRING",
            description: "Date the test took place.",
            required: true,
		},
        {
            name: 'departmentrank',
            type: 'STRING',
            description: 'Your rank in ScD',
            required: true,
        },
        {
            name: 'dclass',
            type: 'INTEGER',
            description: 'Number of D-Class tested on.',
            required: true,
        },
        {
            name: 'combatives',
            type: 'INTEGER',
            description: 'Number of Combatives helping test.',
            required: true,
        },
        {
            name: 'spectators',
            type: 'STRING',
            description: 'The spectators watching the test.',
            required: true,
        },
        {
            name: 'scps',
            type: 'STRING',
            description: 'The SCP(s) being tested on.',
            required: true,
        },
        {
            name: 'rationale',
            type: 'STRING',
            description: 'The rationale for the test.',
            required: true,
        },
        {
            name: 'conclusion',
            type: 'STRING',
            description: 'The conclusion derived from the test.',
            required: true,
        },
        {
            name: 'description',
            type: 'STRING',
            description: 'The test described in detail.',
            required: true,
        }
	],
	async execute(interaction) {
        const fs = require('fs');
        const tests = require('./tests.json');
        const data = require('./data.json');

        function saveDatad() {
            fs.writeFile('./commands/data.json', JSON.stringify(data), function (err) { 
                if (err) throw err;
            });
        }
        function saveDatat() {
            fs.writeFile('./commands/tests.json', JSON.stringify(tests), function (err) { 
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

        const index = require('C:/Users/chad/OneDrive/Desktop/DISCORD BOTS/scdbot/index.js');

        const testNumber = Math.floor(Math.random() * 10000);

        tests.test[testNumber] = {'user': interaction.user.id};
        saveDatat();
        
        const theEmbed = new MessageEmbed()
            .setColor('#233287')
            .setTitle('ScD Test ID#' + testNumber)
            .setAuthor(interaction.member.displayName, interaction.user.avatarURL())
            .setDescription("Date of Test: " + Date + "\nDepartment Rank: " + Rank + "\n\n# of Class-D used: " + CDs + "\n\n# of Combatives: " + Combatives + "\n\nSpectators: " + Specs + "\n\nSCP(s) tested on: " + SCPs + "\n\nTest Rationale: " + Rationale + "\n\nConclusion: " + Conclusion + "\n\nThe test described in detail: " + Desc)
            .setTimestamp()
        index.channel.send({ embeds: [theEmbed] });
        interaction.reply('Your log was successfully sent.');
    },
};