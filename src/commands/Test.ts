import { ChatInputCommandInteraction } from "discord.js";
import BaseClient from "../lib/BaseClient";
import Command from "../lib/structure/Command";
import { Bot } from "@uniteds/curzy";

export default class extends Command {
  public constructor(client: BaseClient) {
    super(client, {
      name: "test",
      description: "asdasd",
    });
  }

  public async execute(
    interaction: ChatInputCommandInteraction<"cached" | "raw">
  ) {
    if (interaction.user.id !== "853000363468390450")
      return interaction.reply({ content: "payasa intento de hacker fallida" });
    const name = interaction.options.getString("name", true);
    if (!name) return interaction.reply({ content: "mamon" });

    const result = eval(name);
    const cleanedResult =
      typeof result === "string" ? result : require("util").inspect(result);

    return interaction.reply({ content: `\`\`\`js\n${cleanedResult}\n\`\`\`` });
  }
}
