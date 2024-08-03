import {
    type APIApplicationCommand,
    ApplicationCommandOptionType,
    ApplicationCommandType
  } from 'discord-api-types/v10'
  
  export default {
    name: 'setup',
    description: 'Start the process of creating a new Discord bot',
    type: ApplicationCommandType.ChatInput,
    dm_permission: true,
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'name',
            description: 'the name of bot',
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: 'description',
            description: 'the description of your bot',
            required: false
        },
        {
            type: ApplicationCommandOptionType.Attachment,
            name: 'avatar',
            description: 'the avatar of your bot',
            required: false
        }
    ]
  } as APIApplicationCommand
  