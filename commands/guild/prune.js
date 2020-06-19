const { Command } = require('discord.js-commando');

module.exports = class PruneCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'usun',
      aliases: ['delete-messages', 'bulk-delete'],
      description: 'Usuwa do 99 ostatnich wiadomości',
      group: 'guild',
      memberName: 'prune',
      guildOnly: true,
      userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
      args: [
        {
          key: 'deleteCount',
          prompt: 'Jak dużo wiadomości chcesz usunąć?',
          type: 'integer',
          validate: deleteCount => deleteCount < 100 && deleteCount > 0
        }
      ]
    });
  }

  run(message, { deleteCount }) {
    message.channel
      .bulkDelete(deleteCount)
      .then(messages => message.say(`Usunąłem ${messages.size} wiadomości`))
      .catch(e => {
        console.error(e);
        return message.say(
          'Coś poszło nie tak jak usuwałem wiadomości :('
        );
      });
  }
};
