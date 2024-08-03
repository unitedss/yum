import {
    type APIApplicationCommand,
    ApplicationCommandType
  } from 'discord-api-types/v10'
  
  export default {
    name: 'about',
    description: 'Send a message with bot information',
    type: ApplicationCommandType.ChatInput,
    dm_permission: true
  } as APIApplicationCommand
  