module.exports = {
	name: 'grade',
	description: 'Grades a test.',
    options: [
        {
            name: "test",
            type: "STRING",
            description: "ID of test.",
            required: true,
        },
        {
            name: "grade",
            type: "STRING",
            description: "Accept or deny the test.",
            required: true,
            choices: [
                {
                    name: "Accept",
                    value: "accept",
                },
                {
                    name: "Deny",
                    value: "Deny",
                }
            ],
        },
        {
            name: "feedback",
            type: "STRING",
            description: "Give feedback to the test.",
            required: true,
        }
    ],
	async execute(interaction) {
        const fs = require('fs');
        const tests = require('./tests.json');
        const data = require('./data.json');
        const index = require('C:/Users/chad/OneDrive/Desktop/DISCORD BOTS/scdbot/index.js');

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
		const test = interaction.options.getString('test');
        const grade = interaction.options.getString('grade');
        const feedback = interaction.options.getString('feedback');
        if (interaction.channel.id == index.channel) {
            if (!tests.test[test]) {
                interaction.reply({content: "Invalid ID.", ephemeral: true});
            } else {
                if (grade == 'accept') {
                    index.fchannel.send('<@' + tests.test[test].user + '>, your test has been accepted. Feedback: ' + feedback);
                    data.users[tests.test[test].user].testsDone += 1
                    saveDatad();
                    interaction.reply('Test #' + test + ' graded.');
                    tests.test[test] = tests.test[0];
                    saveDatat();
                } else {
                    index.fchannel.send('<@' + tests.test[test].user + '>, your test has been denied. Feedback: ' + feedback);
                    interaction.reply('Test #' + test + ' graded.');
                    tests.test[test] = tests.test[0];
                    saveDatat();
                }
            }
        } else {
            interaction.reply({content: "Insufficent permissions.", ephemeral: true});
        }
	},
};