module.exports = {
	name: 'change',
	description: 'Changes a users data.',
    options: [
        {
			name: "damention",
			description: "User being changed.",
			type: "USER",
			required: true,
		},
		{
			name: "davalue",
			description: "What are you changing their total to?",
			type: "INTEGER",
			required: true,
		}
    ],
	async execute(interaction) {
		const fs = require('fs');
		function saveDatad() {
            fs.writeFile('./commands/data.json', JSON.stringify(data), function (err) { 
                if (err) throw err;
            });
        }
		var data = require('./data.json');
		const daMention = interaction.options.getUser("damention");
		const daValue = interaction.options.getInteger("davalue");
        const index = require('/app/index.js');

        if (interaction.channel.id == index.channel) {

			if (!data.users[daMention.id]) {
				data.users[daMention.id] = {
					'testsDone': 0,
				}
			}

			data.users[daMention.id].testsDone = daValue;
			saveDatad();
			interaction.reply({content: "The tests accepted for <@" + daMention + "> has been changed to " + daValue, ephemeral: true});
		} else {
			interaction.reply({content: "Insufficent permissions.", ephemeral: true}); return;
		};
	},
};