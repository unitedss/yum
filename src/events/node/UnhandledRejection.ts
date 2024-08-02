import type BaseClient from '../../lib/BaseClient';
import Event from '../../lib/structure/Event';

export default class extends Event {
	public constructor(client: BaseClient) {
		super(client, {
			name: 'unhandledRejection',
			once: false,
		});
	}

	public run(error: Error) {
		if (error.name === 'DiscordAPIError[10062]') return;
		console.error(`${error.name}: ${error.message}`);
	}
}