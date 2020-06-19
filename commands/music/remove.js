const { Command } = require('discord.js-commando');

module.exports = class RemoveSongCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove',
      memberName: 'remove',
      group: 'music',
      description: 'Usun konkretny utwór z kolejki',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt: 'Z którym numerem utwór chicałbyś usunąć z kolejki?',
          type: 'integer'
        }
      ]
    });
  }
  run(message, { songNumber }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      return message.reply('Wpisz proszę poprawny numer utworu');
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Połącz się z kanałem i spróbuj ponownie');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Nie odtwarzam żadnego utworu aktualnie');
    }

    message.guild.musicData.queue.splice(songNumber - 1, 1);
    return message.say(`Usunięto utwór numer ${songNumber} z kolejki`);
  }
};
