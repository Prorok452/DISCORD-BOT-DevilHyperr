const { Command } = require('discord.js-commando');

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip-song', 'advance-song'],
      memberName: 'skip',
      group: 'music',
      description: 'Pomiń aktualny utwór',
      guildOnly: true
    });
  }

  run(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Połącz się z kanałem i spróbój ponownie');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Nie odtwarzam żadnego utworu aktualnie');
    } else if (message.guild.triviaData.isTriviaRunning) {
      return message.reply(`Nie możesz skipnąć`);
    }
    message.guild.musicData.songDispatcher.end();
  }
};
