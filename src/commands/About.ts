import { EmbedBuilder, type ChatInputCommandInteraction } from 'discord.js'
import type BaseClient from '../lib/BaseClient'
import Command from '../lib/structure/Command'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default class extends Command {
  public constructor(client: BaseClient) {
    super(client, {
      name: 'about',
      description: 'Send a message with bot information'
    })
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached' | 'raw'>) {

    const usExists = await prisma.user.findFirst({ where: { userId: interaction.user.id }})
    if(usExists) return interaction.reply({ content: 'This user is already register.'})
    
      else {
        const newUser = await prisma.user.create({
          data: {
            userId: interaction.user.id,
            username: interaction.user.username,
            bio: 'No bio yet!'
          }
        });
        interaction.reply({ content: `${JSON.stringify(newUser)}`})
      }

    // const embed = new EmbedBuilder()

    // .setAuthor({ name: `Information of ${this.client.user?.tag}`, iconURL: this.client.user?.displayAvatarURL({ forceStatic: true })})
    // .setTitle(`📘 About ${this.client.user?.username}`)
    // .setDescription(`${this.client.user?.username} is your all-in-one tool for creating, managing, and enhancing Discord bots. Here\'s a quick overview of what you can do with me:`)
    // .addFields(
    //   {
    //     name: '🔍 Overview',
    //     value: 'I offer a range of commands to help you interact with and manage your bots efficiently. From creating new bots to viewing detailed information, I’m here to make bot management easy and effective.'
    //   },
    //   {
    //     name: '🛠️ Key Commands',
    //     value: '/setup: Start the process of creating a new Discord bot.\n/bots: View a list of all the bots you own.\n/info: Get detailed information about a specific bot.\n/top: See a ranked list of the best bots.\n/boost: Enhance your bot’s capabilities.\n/buy: Purchase a bot from another user.\n/gift: Give away one of your bots to another user.'
    //   },
    //   {
    //     name: '📬 Communication',
    //     value: 'Stay updated with important messages:\n/mail: Read your unread emails.\n/invite: Create an invitation link to add me to your server.\n/profile: View and update your profile information.'
    //   },
    //   {
    //     name: '❓ Need Help?',
    //     value: 'For more detailed help and guidance, use /help. This command provides a comprehensive overview of all available commands and their usage.'
    //   }
    // )
    // .setFooter({ text: `Explore the full range of features and commands to get the most out of ${this.client.user?.username}!` })
    // .setColor(0xfbfbf9)

    // interaction.reply({ embeds: [embed] })
  }
}
