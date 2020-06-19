const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: ['ban-member', 'ban-hammer'],
      memberName: 'ban',
      group: 'guild',
      description: 'Banuje oznaczonego użytkownika',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToBan',
          prompt:
            'Oznacz osobę, którą chcesz zbanować: @ lub wpisz jego ID',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Dlaczego chcesz to zrobić',
          type: 'string'
        }
      ]
    });
  }

  run(message, { userToBan, reason }) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.fetch(userToBan);
    if (user == undefined)
      return message.channel.send('Spróbuj z prawdziwym użytkownikiem');
    user
      .ban(reason)
      .then(() => {
        const banEmbed = new MessageEmbed()
          .addField('Banned:', userToBan)
          .addField('Powód', reason)
          .setColor('#420626');
        message.channel.send(banEmbed);
      })
      .catch(e => {
        message.say(
          'Coś poszło nie tak podczas banowania, prawdopodobnie nie mam permisjii'
        );
        return console.error(e);
      });
  }
};
