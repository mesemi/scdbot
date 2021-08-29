const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

/*
Discord bot made for Civilous' SCPF Scientific Department by mesemi#0758
*/

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} | ${guild.id}`);
	})
});

client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id) {
		const data = [
			{
				name: 'ping',
				description: 'Replies with Pong!',
			},
			{
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
						name: 'description',
						type: 'STRING',
						description: 'The test described in detail.',
						required: true,
					},
					{
						name: 'conclusion',
						type: 'STRING',
						description: 'The conclusion derived from the test.',
						required: true,
					},
          {
            name: 'proof',
            type: 'STRING',
            description: 'MUST BE AN IMAGE LINK',
            required: true,
          },
          {
            name: 'notes',
            type: 'STRING',
            description: 'Extra notes.',
          }
				],
			},
			{
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
					},
				],
			},
			{
				name: 'total',
				description: 'Lists your total accepted tests.'
			},
			{
				name: 'alltotals',
				description: "Lists all users accepted tests."
			},
			{
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
			},
      {
				name: 'report',
				description: 'Submit a RA report.',
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
			},
		];
    message.reply("deployed");
		const command = await client.application?.commands.set(data);
	}
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (!client.commands.has(interaction.commandName)) return;

	const channel = await client.channels.cache.get('874097034288848896'); //Reporting channel
	const fchannel = await client.channels.cache.get('731984961480949762'); //Feedback channel.
	module.exports = {
		channel,
		fchannel,
	};

	try {
		await client.commands.get(interaction.commandName).execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login(process.env.TOKEN);