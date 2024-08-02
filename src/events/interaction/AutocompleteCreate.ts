import type BaseClient from "../../lib/BaseClient";
import Event from "../../lib/structure/Event";
import { Events, type AutocompleteInteraction } from "discord.js";
import { resolveCommandName } from "../../lib/utils/Function";

export default class extends Event {
  public constructor(client: BaseClient) {
    super(client, {
      name: Events.InteractionCreate,
      description: "fasfd",
      once: false,
    });
  }

  public async run(interaction: AutocompleteInteraction<"cached" | "raw">) {
    if (!interaction.isAutocomplete()) return;

    const command = this.client.commands.get(resolveCommandName(interaction));
    if (command) {
      try {
        await command.autocomplete(interaction);
      } catch (e: unknown) {
        console.error(`${(e as Error).name}: ${(e as Error).message}`);
      }
    }
  }
}
