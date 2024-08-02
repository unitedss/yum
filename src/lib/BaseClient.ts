import {
  AllowedMentionsTypes,
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} from 'discord.js'
import semver from 'semver'
import type Command from './structure/Command'
import type Event from './structure/Event'
import Util from './structure/Util'

export default class BaseClient extends Client {
  public commands: Collection<string, Command>
  public aliases: Collection<string, Command>
  public events: Collection<string, Event>
  public utils: Util
  public constructor(options: ClientOptions) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ],
      partials: [Partials.Message, Partials.Channel],
      allowedMentions: {
        parse: [AllowedMentionsTypes.User, AllowedMentionsTypes.Role],
        repliedUser: false
      }
    })
    this.validate(options)

    this.commands = new Collection()
    this.aliases = new Collection()
    this.events = new Collection()
    this.utils = new Util(this)
  }

  private validate(options: ClientOptions) {
    if (typeof options !== 'object')
      throw new TypeError('Options should be a type of Object.')
    if (semver.lt(process.versions.node, '16.14.0')) {
      throw new Error('This client requires Node.JS v16.14.0 or higher.')
    }

    if (!options.token)
      throw new Error('You must pass the token for the Client.')
    this.token = options.token
  }

  public async start(token = this.token) {
    await this.utils.loadCommands()
    await this.utils.loadEvents()
    await super.login(token as string)
  }
}
