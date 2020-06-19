const { Command } = require('discord.js-commando');

module.exports = class WhoMadeMeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'whomademe',
      aliases: ['bot-maker', 'bot-creator'],
      memberName: 'whomademe',
      group: 'other',
      description: "Wysyła wiadomość na temat twórcy"
    });
  }

  run(message) {
    message.say(
      'Created by Prorok452 :heart:'
    );
  }
};
