const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
      .setName('alltotals')
      .setDescription("Replies with all users' totals."),
	async execute(client, interaction) {
        const tests = require('/app/data/json/tests.json');
        const data = require('/app/data/json/data.json');
    
    const channel = await client.channels.cache.get('874097034288848896');
		if (interaction.channel === channel) {
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