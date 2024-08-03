import {
    type APIApplicationCommand,
    ApplicationCommandOptionType,
    ApplicationCommandType
  } from 'discord-api-types/v10'
  
  export default {
    name: 'register',
    description: 'You register in the database.',
    type: ApplicationCommandType.ChatInput,
    dm_permission: true,
  } as APIApplicationCommand
  