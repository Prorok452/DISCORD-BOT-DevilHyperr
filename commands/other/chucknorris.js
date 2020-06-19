const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class ChuckNorrisCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'chucknorris',
      aliases: ['chuckfact', 'norris', 'chuck-norris'],
      group: 'other',
      memberName: 'chucknorris',
      description: 'Wysyła jakiś fakt na temat Chucka Norrisa!',
      throttling: {
        usages: 1,
        duration: 6
      }
    });
  }

  run(message) {
    // thanks to https://api.chucknorris.io
    fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor('#E41032')
          .setTitle('Chuck Norris Fact')
          .setDescription(json.value)
          .setURL('https://api.chucknorris.io');
        return message.say(embed);
      })
      .catch(err => {
        message.say('Wystąpił błąd, Chuck to widzi!');
        return console.error(err);
      });
  }
};
