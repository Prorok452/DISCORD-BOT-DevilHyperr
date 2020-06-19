const { Command } = require('discord.js-commando');

module.exports = class SkipToCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipto',
      memberName: 'skipto',
      group: 'music',
      description:
        'Przeskocz do konkretnego utworu w kolejce, wprowadź numer jako argument',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt:
            'Jaki jest numer utworu do którego chcesz przeskoczyć?',
          type: 'integer'
        }
      ]
    });
  }

  run(message, { songNumber }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      return message.reply('Wprowadź poprawny numer utworu');
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Połącz się z kanałem i spróbój ponownie');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Nie odtwarzam żadnego utworu aktualnie');
    }

    if (message.guild.musicData.queue < 1)
      return message.say('Nie ma żadnych utworów w kolejce');

    message.guild.musicData.queue.splice(0, songNumber - 1);
    message.guild.musicData.songDispatcher.end();
    return;
  }
};
