import type { DiscordAPIError } from '@discordjs/rest'
import { type CommandInteraction, Events, type GuildMember } from 'discord.js'
import type BaseClient from '../../lib/BaseClient'
import Event from '../../lib/structure/Event'
import {
  formatArray,
  formatPermissions,
  resolveCommandName
} from '../../lib/utils/Function'

export default class extends Event {
  public constructor(client: BaseClient) {
    super(client, {
      name: Events.InteractionCreate,
      description: 'asdd',
      once: false
    })
  }

  public async run(interaction: CommandInteraction<'cached' | 'raw'>) {
    if (
      !interaction.isChatInputCommand() &&
      !interaction.isContextMenuCommand()
    )
      return

    const command = this.client.commands.get(resolveCommandName(interaction))
    if (command) {
      if (command.disabled) {
        return interaction.reply({
          content: 'This command is currently inaccessible.',
          ephemeral: true
        })
      }

      if (!interaction.inCachedGuild()) {
        return interaction.reply({
          content: 'This command cannot be used out of a server.',
          ephemeral: true
        })
      }

      try {
        await command.execute(interaction)
      } catch (e: unknown) {
        if ((e as DiscordAPIError).name === 'DiscordAPIError[10062]') return
        if (interaction.replied) return
        console.error(`${(e as Error).name}: ${(e as Error).message}`)

        const replies = [
          'An error has occured when executing this command.',
          'If the issue persists, please contact us in our Support Server.'
        ].join('\n')

        if (interaction.deferred)
          return interaction.editReply({ content: replies })
        return interaction.reply({ content: replies, ephemeral: true })
      }
    }
  }
}
