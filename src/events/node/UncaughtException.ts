import type BaseClient from '../../lib/BaseClient';
import Event from '../../lib/structure/Event'

export default class extends Event {
	public constructor(client: BaseClient) {
		super(client, {
			name: 'uncaughtException',
			once: false,
		});
	}

	public run(error: Error) {
		console.error(`${error.name}: ${error.message}`);
	}
}