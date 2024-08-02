import type BaseClient from '../../lib/BaseClient';
import Event from '../../lib/structure/Event'

export default class extends Event {
	public constructor(client: BaseClient) {
		super(client, {
			name: 'debug',
			once: false
		});
	}

	public run(info: string) {
		if (!this.client.debug) return;
		console.log(info);
	}
}