import { Events, REST } from "discord.js";
import BaseClient from "../../lib/BaseClient";
import Event from "../../lib/structure/Event";
import { redBright, underline } from "colorette";

export default class extends Event {
  public constructor(client: BaseClient) {
    super(client, {
      name: Events.ClientReady,
      description: "I dont known",
      once: true,
    });
  }

  public run() {
    this.client.user?.setPresence({
      activities: [{ name: `🥤 yum?` }],
      status: "idle",
    });
    console.log(
      `Logged in as ${redBright(underline(`${this.client.user?.tag}`))}`
    );
    console.log(`Loaded ${this.client.commands.size} commands`);
  }
}
