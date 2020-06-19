const { Command } = require('discord.js-commando');

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      aliases: ['resume-song', 'continue'],
      memberName: 'resume',
      group: 'music',
      description: 'Odpauzuj aktualnie zatrzymany utwór',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Połącz się z kanałem i spróbuj ponownie');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher === null
    ) {
      return message.reply('Nie odtwarzam żadnego utworu aktualnie');
    }

    message.say('Utwór odpauzowany :play_pause:');

    message.guild.musicData.songDispatcher.resume();
  }
};
