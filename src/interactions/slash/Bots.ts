import {
    type APIApplicationCommand,
    ApplicationCommandOptionType,
    ApplicationCommandType
  } from 'discord-api-types/v10'
  
  export default {
    name: 'bots',
    description: 'Send a list of the bots you own.',
    type: ApplicationCommandType.ChatInput,
    dm_permission: true,
  } as APIApplicationCommand
  