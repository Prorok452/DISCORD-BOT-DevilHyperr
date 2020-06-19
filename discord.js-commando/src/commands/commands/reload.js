const { oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class ReloadCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			aliases: ['reload-command'],
			group: 'commands',
			memberName: 'reload',
			description: 'Reloads a command or command group.',
			details: oneLine`
				The argument must be the name/ID (partial or whole) of a command or command group.
				Providing a command group will reload all of the commands in that group.
				Only the bot owner(s) may use this command.
			`,
			examples: ['reload some-command'],
			ownerOnly: true,
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Którą komendę, bądź grupę chciałbyś przeładować?',
					type: 'group|command'
				}
			]
		});
	}

	async run(msg, args) {
		const { cmdOrGrp } = args;
		const isCmd = Boolean(cmdOrGrp.groupID);
		cmdOrGrp.reload();

		if(this.client.shard) {
			try {
				await this.client.shard.broadcastEval(`
					if(this.shard.id !== ${this.client.shard.id}) {
						this.registry.${isCmd ? 'commands' : 'groups'}.get('${isCmd ? cmdOrGrp.name : cmdOrGrp.id}').reload();
					}
				`);
			} catch(err) {
				this.client.emit('warn', `Wystąpił błąd podczas próby przeładowania`);
				this.client.emit('error', err);
				if(isCmd) {
					await msg.reply(`Przeładowałem tę \`${cmdOrGrp.name}\` grupę komend, ale nie udało mi się załadować wszystkich elementów`);
				} else {
					await msg.reply(
						`Przeładowałem wszystkie komendy z tej \`${cmdOrGrp.name}\` grupy, ale nie udało mi się załadować innych elementów`
					);
				}
				return null;
			}
		}

		if(isCmd) {
			await msg.reply(`Przeładowałem \`${cmdOrGrp.name}\` command${this.client.shard ? ' i wszystkie elementy' : ''}.`);
		} else {
			await msg.reply(
				`Przeładowałem wszystkie komendy z tej \`${cmdOrGrp.name}\` group${this.client.shard ? ' i wszystkie elementy' : ''}.`
			);
		}
		return null;
	}
};
