module.exports = {
	name: 'total',
	description: 'Check your total accepted tests.',
	async execute(interaction) {
        const tests = require('./tests.json');
        const data = require('./data.json');
		interaction.reply({ content: "You have gotten " + data.users[interaction.user.id].testsDone + " tests accepted."})
	},
};