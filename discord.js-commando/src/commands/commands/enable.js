const { oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class EnableCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'enable',
			aliases: ['enable-command', 'cmd-on', 'command-on'],
			group: 'commands',
			memberName: 'enable',
			description: 'Enables a command or command group.',
			details: oneLine`
				The argument must be the name/ID (partial or whole) of a command or command group.
				Only administrators may use this command.
			`,
			examples: ['enable util', 'enable Utility', 'enable prefix'],
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Którą komendę bądź grupę chciałbyś włączyć?',
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
		const group = args.cmdOrGrp.group;
		if(args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
			return msg.reply(
				`Ta \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'} jest już włączona${
					group && !group.isEnabledIn(msg.guild) ?
					`, ale ta \`${group.name}\` grupa jest wciąż wyłączona i nie może być używana` :
					''
				}.`
			);
		}
		args.cmdOrGrp.setEnabledIn(msg.guild, true);
		return msg.reply(
			`Włączyłem \`${args.cmdOrGrp.name}\` ${group ? 'command' : 'group'}${
				group && !group.isEnabledIn(msg.guild) ?
				`, ale ta \`${group.name}\` grupa jest wciąż wyłączona i nie może być używana` :
				''
			}.`
		);
	}
};
