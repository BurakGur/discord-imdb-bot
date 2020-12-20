require('dotenv').config();
const Imdb = require('imdb-api')
const { Client, MessageAttachment } = require('discord.js');
const discordClient = new Client();
const imdbClient = new Imdb.Client({ apiKey: process.env.IMDB_TOKEN });


discordClient.on('ready', () => {
	console.log(`Bot ready!`);
});


discordClient.on('message', msg => {
	if (msg.content && msg.author.bot === false && msg.channel.type === 'dm') {
		imdbClient.get({ 'name': msg.content }).then(async (result) => {
			const attachment = new MessageAttachment(result.poster);
			await msg.reply(attachment);
			await msg.reply('Name: ' + result.title);
			await msg.reply('Year: ' + result.year);
			await msg.reply('Rating: ' + result.rating);
			await msg.reply('Actors: ' + result.actors);
			await msg.reply('Director: ' + result.director);
			await msg.reply('Plot: ' + result.plot);
			await msg.reply('Awards: ' + result.awards);
			await msg.reply('IMDb Url: ' + result.imdburl);
		}).catch((error) => {
			msg.reply('Sorry :disappointed_relieved: We couldn\'t find the movie.');
		})
	}
});

discordClient.login(process.env.BOT_TOKEN);