module.exports = {
	name: 'alltotals',
	description: 'Replies with all users totals.',
	async execute(interaction) {
        const tests = require('./tests.json');
        const data = require('./data.json');
        const index = require('C:/Users/chad/OneDrive/Desktop/DISCORD BOTS/scdbot/index.js');
		if (interaction.channel.id === '873711021330694214') {
			var Content = 'Here is your status report:\n\n'
			for (const [key, value] of Object.entries(data.users)) {
				Content = Content + '<@' + key + '> has gotten `' + value.testsDone + '` tests accepted.\n'
			}
			interaction.reply({content: Content, ephemeral: true})
		} else {
			interaction.reply({content: "Insufficient permissions.", ephemeral: true});
		}
	},
};