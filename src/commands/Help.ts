import { type ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import type BaseClient from '../lib/BaseClient'
import Command from '../lib/structure/Command'

export default class extends Command {
  public constructor(client: BaseClient) {
    super(client, {
      name: 'help',
      description: 'Send a help message.'
    })
  }

  public execute(interaction: ChatInputCommandInteraction<'cached' | 'raw'>) {

    const maped = this.client.commands.map(c => c.name)
    console.log(maped)
    const embed = new EmbedBuilder()
      .setAuthor({
        iconURL: this.client.user?.displayAvatarURL({
          forceStatic: true
        }) as string,
        name: `Commands of ${this.client.user?.tag}`
      })
      .setDescription(
        '**Use** `/help [command]` for more info!\n**For a better experience you can [Register on our website](https://pornhub.com)!**'
      )
      .addFields(
        {
          name: '📬 ━ ¡You have 1 unread email(s)!',
          value: 'To see new updates use `/mail`'
        },
        {
          name: '/bots',
          value: 'List of all the bots you own.',
          inline: true
        },
        {
          name: '/info',
          value: 'View information about your bot.',
          inline: true
        },
        {
          name: '/setup',
          value: 'Create a discord bot.',
          inline: true
        },
        {
          name: '/top',
          value: 'Shows a ranked list of the best bots.',
          inline: true
        },
        {
          name: '/about',
          value: '¿What is the bot for?',
          inline: true
        },
        {
          name: '/help',
          value: 'Send a help message.',
          inline: true
        },
        {
          name: '/invite',
          value: 'Create an invitation to add me to your server.',
          inline: true
        },
        {
          name: '/mail',
          value: 'Read unread emails.',
          inline: true
        },
        {
          name: '/boost',
          value: 'Improve your bot',
          inline: true
        },
        {
          name: '/buy',
          value: 'Buy a bot from another user',
          inline: true
        },
        {
          name: '/gift',
          value: 'Give away one of your bots',
          inline: true
        },
        {
          name: '/profile',
          value: 'View your profile information',
          inline: true
        }
      )
      .setColor(0xfbfbf9)

    return interaction.reply({ embeds: [embed] })
  }
}
