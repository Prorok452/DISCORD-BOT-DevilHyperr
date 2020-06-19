const { oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class DisableCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'disable',
			aliases: ['disable-command', 'cmd-off', 'command-off'],
			group: 'commands',
			memberName: 'disable',
			description: 'Disables a command or command group.',
			details: oneLine`
				The argument must be the name/ID (partial or whole) of a command or command group.
				Only administrators may use this command.
			`,
			examples: ['disable util', 'disable Utility', 'disable prefix'],
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Którą komendę bądź grupę chciałbyś wyłączyć?',
					type: 'group|command'
				}
			]
		});
	}

	hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
	}

	run(msg, args) {
		if(!args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
			return msg.reply(
				`Ta grupa \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'} jest już wyłączona.`
			);
		}
		if(args.cmdOrGrp.guarded) {
			return msg.reply(
				`Nie możesz wyłączyć tej \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'}.`
			);
		}
		args.cmdOrGrp.setEnabledIn(msg.guild, false);
		return msg.reply(`Wyłączyłem \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'}.`);
	}
};
