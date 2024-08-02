import type BaseClient from '../lib/BaseClient';
import type { Collection, Events, PermissionsString } from 'discord.js';
import type { EventEmitter } from 'node:events';

declare global {
	interface ClientOptions {
		token: any;
		prefix: string;
		debug: boolean;
		defaultPermissions: PermissionsString[];
	}

	interface CommandOptions {
		name: string;
		aliases?: string[],
		description?: string;
		category?: string;
		memberPermissions?: PermissionsString[];
		clientPermissions?: PermissionsString[];
		disabled?: boolean;
		context?: boolean;
		options?: {
			type: number;
			name: string;
			description: string;
			required?: boolean;
		}[];
	}

	interface SubCommandOptions {
		name: string;
	}

	interface EventOptions {
		name: Events
		description: string;
		once?: boolean;
	}
}
