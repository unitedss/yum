import { EmbedBuilder, type ChatInputCommandInteraction } from 'discord.js'
import type BaseClient from '../lib/BaseClient'
import Command from '../lib/structure/Command'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default class extends Command {
  public constructor(client: BaseClient) {
    super(client, {
      name: 'register',
      description: 'You register in the database.'
    })
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached' | 'raw'>) {

    const usExists = await prisma.user.findFirst({ where: { userId: interaction.user.id }})
    if(usExists) return this.error(interaction, "You're already registered!")

    await prisma.user.create({
        data: {
            userId: interaction.user.id,
            username: interaction.user.username,
            bio: 'No bio yet.',
        }
    })

    const embed = new EmbedBuilder()

    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ forceStatic: true })})
    .setDescription(`${interaction.user.username}`)
    .addFields({
        name: 'Bio',
        value: `\`\`\`No bio yet.\`\`\``
    })
    .setTimestamp()
    .setColor(0xfbfbf9)

    interaction.reply({ embeds: [embed] })
    
  }
}
