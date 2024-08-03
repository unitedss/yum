import { EmbedBuilder, type ChatInputCommandInteraction } from 'discord.js'
import type BaseClient from '../lib/BaseClient'
import Command from '../lib/structure/Command'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default class extends Command {
  public constructor(client: BaseClient) {
    super(client, {
      name: 'profile',
      description: 'Send an embed with your profile or that of a user.'
    })
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached' | 'raw'>) {

    const user = interaction.options.getUser('user') || interaction.user;

    const usExists = await prisma.user.findFirst({ where: { userId: user.id }})
    if(!usExists) this.error(interaction, "You aren't registered yet!")

    const embed = new EmbedBuilder()

    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ forceStatic: true })})
    .setDescription(`${usExists?.username}`)
    .setFooter({ text: `<t:${Math.floor(usExists?.createdAt.getTime() as number / 1000)}:R>`})
    .setColor(0xfbfbf9)

    interaction.reply({ embeds: [embed] })
  }
}
