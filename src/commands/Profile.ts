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
    if(!usExists) return this.error(interaction, `**${user.username}** isn't registered. Try using \`/register\`.`)

      const bots = await prisma.bot.findMany({ where: { userId: usExists.userId }})

    const embed = new EmbedBuilder()

    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ forceStatic: true })})
    .setDescription(`${usExists?.username}`)
    .addFields(
      {
        name: 'Bots',
        value: `${bots.map(bot => bot.name)}`,
        inline: true
      },
      {
        name: 'Bio',
        value: `\`\`\`${usExists?.bio}\`\`\``
    })
    .setFooter({ text: `<t:${Math.floor(usExists?.createdAt.getTime() as number / 1000)}:R>`})
    .setColor(0xfbfbf9)

    await interaction.reply({ embeds: [embed] })
  }
}
