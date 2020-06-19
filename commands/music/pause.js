const { Command } = require('discord.js-commando');

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      aliases: ['pause-song', 'hold', 'stop'],
      memberName: 'pause',
      group: 'music',
      description: 'Zatrzymuje aktualny utwór',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Połącz się z kanałem i spróbuj ponownie');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.say('Żaden utwór nie jest puszczony aktualnie');
    }

    message.say('Zatrzymałem :pause_button:');

    message.guild.musicData.songDispatcher.pause();
  }
};
