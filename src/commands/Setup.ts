import { EmbedBuilder, type ChatInputCommandInteraction } from 'discord.js'
import type BaseClient from '../lib/BaseClient'
import Command from '../lib/structure/Command'
import { PrismaClient } from '@prisma/client'
import { connect } from 'bun';
const prisma = new PrismaClient();

export default class extends Command {
  public constructor(client: BaseClient) {
    super(client, {
      name: 'setup',
      description: 'Start the process of creating a new Discord bot'
    })
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached' | 'raw'>) {

    const usExists = await prisma.user.findFirst({ where: { userId: interaction.user.id }})
    if(!usExists) return this.error(interaction, `**${interaction.user.username}** isn't registered. Try using \`/register\`.`)


    const name = interaction.options.getString('name')
    const description = interaction.options.getString('description')
    const avatar = interaction.options.getAttachment('avatar')
    if(typeof avatar === null) {
        throw new Error('asddd')
    }
    if (name === null) {
        throw new Error('Name is required but was not provided.');
    }

    await prisma.bot.create({
        data: {
            name,
            description: description ?? "No description provided.",
            avatar: avatar?.url,
            createdAt: new Date(),
            user: {
                connect: {
                    userId: usExists.userId
                }
            },
        }
    })

    const embed = new EmbedBuilder()
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ forceStatic: true })})
    .setDescription(`${interaction.user.username}, this is a test message.`)
    .setTimestamp()
    .setColor(0xfbfbf9)

    return interaction.reply({ embeds: [embed] })
    
  }
}
