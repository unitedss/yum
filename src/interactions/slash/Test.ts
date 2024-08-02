import {
  type APIApplicationCommand,
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord-api-types/v10";

export default {
  name: "test",
  description: "asdasd",
  type: ApplicationCommandType.ChatInput,
  dm_permission: true,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "name",
      description: "nose",
      required: true,
    },
  ],
} as APIApplicationCommand;
