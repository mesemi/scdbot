const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('total')
      .setDescription('Check your total accepted tests.')
      .addUserOption(option =>
          option.setName('user')
                .setDescription('User being checked.')),
	async execute(client, interaction) {
        const data = require('/app/.data/data.json');
        const thePerson = interaction.user.id;
        var theRequest = interaction.options.getUser('user');
        const fs = require('fs')
        const channel = await client.channels.cache.get('874097034288848896');

        if (!theRequest) {
            if (!data.users[thePerson]) {
              data.users[thePerson] = {
                  "testsDone": 0,
              }
          }
          interaction.reply({ content: "You have gotten " + data.users[thePerson].testsDone + " tests accepted."})
        } else {
          if (interaction.channel === channel) {
                if (!data.users[thePerson]) {
                data.users[thePerson] = {
                    "testsDone": 0,
                }
            }
            fs.writeFile('/app/.data/data.json', JSON.stringify(data), function (err) {if (err) throw err;});
            interaction.reply({content: "<@" + theRequest + "> has gotten " + data.users[theRequest.id].testsDone + " tests accepted.", ephemeral: true})
          } else {
            interaction.reply({content: "Insufficient permissions.", ephemeral: true})
          }
        }
	},
};
