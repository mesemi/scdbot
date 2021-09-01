module.exports = {
	name: 'grade',
	description: 'Grades a test.',
    options: [
        {
						name: "item",
						type: "STRING",
						description: "What are you grading?",
						required: true,
						choices: [
							{
								name: "Test",
								value: "test",
							},
							{
								name: "Report",
								value: "Report",
							}
						],
					},
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
        const reports = require('./reports.json');
        const index = require('/app/index.js');

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
        function saveDatar() {
            fs.writeFile('./commands/reports.json', JSON.stringify(reports), function (err) { 
                if (err) throw err;
            });
        }
		  const test = interaction.options.getString('test');
      const grade = interaction.options.getString('grade');
      const feedback = interaction.options.getString('feedback');
      const item = interaction.options.getString('item');
        if (interaction.channel.id == index.channel) {
            if (item == 'test') {
                if (!tests.test[test]) {
                    interaction.reply({content: "Invalid ID.", ephemeral: true});
                } else {
                    if (grade == 'accept') {
                        index.fchannel.send('<@' + tests.test[test].user + '>, your test has been accepted by <@' + interaction.user.id + '>. Feedback: ' + feedback);
                        data.users[tests.test[test].user].testsDone += 1
                        saveDatad();
                        interaction.reply('Test #' + test + ' graded.');
                        tests.test[test] = tests.test[0];
                        saveDatat();
                    } else {
                        index.fchannel.send('<@' + tests.test[test].user + '>, your test has been denied by <@' + interaction.user.id + '>. Feedback: ' + feedback);
                        interaction.reply('Test #' + test + ' graded.');
                        tests.test[test] = tests.test[0];
                        saveDatat();
                    }
                }
            } else {
                if (!reports.report[test]) {
                    interaction.reply({content: "Invalid ID.", ephemeral: true});
                } else {
                    if (grade == 'accept') {
                        index.fchannel.send('<@' + reports.report[test].user + '>, your RA report has been accepted by <@' + interaction.user.id + '>. Feedback: ' + feedback);
                        interaction.reply('Report #' + test + ' graded.');
                        reports.report[test] = reports.report[0];
                        saveDatar();
                    } else {
                        index.fchannel.send('<@' + reports.report[test].user + '>, your RA report has been denied by <@' + interaction.user.id + '>. Feedback: ' + feedback);
                        interaction.reply('Report #' + test + ' graded.');
                        reports.report[test] = reports.report[0];
                        saveDatar();
                    }
                }
            }
        } else {
            interaction.reply({content: "Insufficent permissions.", ephemeral: true});
        }
	},
};