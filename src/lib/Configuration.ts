import { Collection, type PermissionsString } from "discord.js";

export const Client: ClientOptions = {
  token: process.env.DISCORD_TOKEN as string,
  prefix: process.env.DISCORD_PREFIX as string,
  debug: process.env.DEBUG_MODE === "true",
  defaultPermissions: ["SendMessages", "ViewChannel"] as PermissionsString[],
};
