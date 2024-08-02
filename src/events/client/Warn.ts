import { Events } from 'discord.js';
import type BaseClient from '../../lib/BaseClient'
import Event from '../../lib/structure/Event'

export default class extends Event {
	public constructor(client: BaseClient) {
		super(client, {
			name: Events.Warn,
			once: false
		});
	}

	public run(info: string) {
		console.warn(info);
	}
}