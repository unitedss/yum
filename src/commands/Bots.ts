import { EmbedBuilder, type ChatInputCommandInteraction } from 'discord.js'
import type BaseClient from '../lib/BaseClient'
import Command from '../lib/structure/Command'
import { PrismaClient } from '@prisma/client'
import { connect } from 'bun';
const prisma = new PrismaClient();

export default class extends Command {
  public constructor(client: BaseClient) {
    super(client, {
      name: 'bots',
      description: 'Send a list of the bots you own'
    })
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached' | 'raw'>) {

    const usExists = await prisma.user.findFirst({ where: { userId: interaction.user.id }})
    if(!usExists) return this.error(interaction, `**${interaction.user.username}** isn't registered. Try using \`/register\`.`)

    let bots = await prisma.bot.findMany({ where: { userId: usExists.userId }})
    const botList = bots.map((bot, i) => `\`${i + 1}\`. **${bot.name}** `).join('\n') || "Nope."

    const embed = new EmbedBuilder()
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ forceStatic: true })})
    .setTitle('List of bots you own')
    .setTimestamp()
    .setColor(0xfbfbf9)
    bots.map((b, i) => {
        embed.addFields({
            name: `\`${i + 1}\`. ${b.name}`,
            value: `${b.description} (<t:${Math.floor(b.createdAt.getTime() / 1000)}:R>)`,
            inline: true
        })
    })

    return interaction.reply({ embeds: [embed] })
    
  }
}
