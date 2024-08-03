import {
    type APIApplicationCommand,
    ApplicationCommandOptionType,
    ApplicationCommandType
  } from 'discord-api-types/v10'
  
  export default {
    name: 'profile',
    description: 'Send an embed with your profile or that of a user.',
    type: ApplicationCommandType.ChatInput,
    dm_permission: true,
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: 'user',
            description: 'Mention a user to see their profile.',
            required: false
        }
    ]
  } as APIApplicationCommand
  