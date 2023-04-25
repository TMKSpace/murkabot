// импорты всякие
const { Client, Events, GatewayIntentBits, Collection, MembershipScreeningFieldType } = require('discord.js');
// const { token } = require('./config.json');
const fs = require('node:fs')
const path = require('node:path')
const TOKEN = require('./config.json').token
//const members = require('./members.json')
//let sas = require('./commands/mcstatus.js')

// Создается новый клиент ебана
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
//let score;
client.on("messageCreate", async msg => {
    let score;
	if (msg.guild) {
      score = await client.getScore.get(msg.author.id, msg.guild.id);
        if (!score) {
            score = {
                id: `${msg.guild.id}-${msg.author.id}`,
                user: msg.author.id,
                guild: msg.guild.id,
                points: 51,
                level: 1,
            };
        }
        const xpAdd = await Math.floor(Math.random() * 10) + 50;
        console.log('рандомная фраза')
		const curxp = await score.points;
        const curlvl = await score.level;
        const nxtLvl = await score.level * 50;
        score.points = await curxp + xpAdd;
        if (nxtLvl <= score.points) {
            score.level = await curlvl + 1;
			console.log('рандомная фраза2')
            const lvlup = await new MessageEmbed()
                .setAuthor(
                    `Congrats ${message.author.username}`,
                    message.author.displayAvatarURL()
                )
                .setTitle('You have leveled up!')
                .setThumbnail('https://i.imgur.com/lXeBiMs.png')
                .setColor(color)
                .addField('New Level', curlvl + 1);
           await msg.channel.send(lvlup)
        }
       await client.setScore.run(score);
    }
  })

client.login(TOKEN);