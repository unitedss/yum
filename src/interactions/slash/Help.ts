import {
  type APIApplicationCommand,
  ApplicationCommandType
} from 'discord-api-types/v10'

export default {
  name: 'help',
  description: 'Send a help message.',
  type: ApplicationCommandType.ChatInput,
  dm_permission: true
} as APIApplicationCommand
