import { ChatInputCommandInteraction } from 'discord.js';
import BaseClient from '../lib/BaseClient';
import Command from '../lib/structure/Command'

export default class extends Command {
    public constructor(client: BaseClient) {
        super(client, {
            name: "ping",
            description: "Send a ping request.",
        })
    }

    public execute(interaction: ChatInputCommandInteraction<'cached' | 'raw'>) {
		const replies = [
			`***Websocket:*** \`${Math.round(this.client.ws.ping)}ms\``,
			`***Latency:*** \`${Math.round(Date.now() - interaction.createdTimestamp)}ms\``
		].join('\n');

		// return interaction.reply({ embeds: [new EmbedBuilder().setDescription(replies).setColor('#FBFBF9')]});
		this.success(interaction, replies)
	}
}