const { Command } = require('discord.js-commando');

module.exports = class SkipAllCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipall',
      aliases: ['skip-all'],
      memberName: 'skipall',
      group: 'music',
      description: 'Pomiń wszystkie utwory w kolejce',
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
      return message.reply('Nie odtwarzam żadnego utworu aktualnie');
    }
    if (!message.guild.musicData.queue)
      return message.say('Nie ma żadnych utworów w kolejce');
    message.guild.musicData.songDispatcher.end();
    message.guild.musicData.queue.length = 0; // clear queue
    return;
  }
};
