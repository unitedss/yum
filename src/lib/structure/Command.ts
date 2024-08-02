import { AutocompleteInteraction, PermissionsString, BitField, CommandInteraction, PermissionsBitField, EmbedBuilder } from "discord.js";
import { Awaitable } from "@discordjs/util";
import BaseClient from "../BaseClient";

export default abstract class Command {
    client: BaseClient;
    name: string;
    description: string;
    memberPermissions: Readonly<BitField<PermissionsString, bigint>>;
    clientPermissions: Readonly<BitField<PermissionsString, bigint>>;
    disabled: boolean;

    public constructor(client: BaseClient, options: CommandOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description ?? "No description provided.";
        this.memberPermissions = new PermissionsBitField(options.memberPermissions).freeze();
        this.clientPermissions = new PermissionsBitField(options.clientPermissions).freeze();
        this.disabled = options.disabled ?? false;
    }

    public abstract execute(interaction: CommandInteraction<'cached' | 'raw'>): Awaitable<unknown>;


    public autocomplete(interactin: AutocompleteInteraction<'cached' | 'raw'>): Awaitable<unknown> {
        throw new Error(`${this.name} doesn't provide a autocomplete method.`)
    }

    public success(interaction: CommandInteraction<'cached' | 'raw'>, msg: string) {
		const embed = new EmbedBuilder().setColor(0xFBFBF9).setDescription(msg);
		return interaction.reply({ embeds: [embed] });
	}
	public error(interaction: CommandInteraction<'cached' | 'raw'>, msg: string) {
		const embed = new EmbedBuilder().setColor('Red').setDescription(msg);
		return interaction.reply({ embeds: [embed] });
	}
}