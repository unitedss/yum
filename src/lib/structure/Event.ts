import type { Awaitable } from '@discordjs/util'
import type { Events } from 'discord.js'
import type BaseClient from '../BaseClient'

export default abstract class Event {
  client: BaseClient
  name: Events | string;
  description?: string
  once: boolean

  public constructor(client: BaseClient, options: EventOptions) {
    this.client = client
    this.name = options.name
    this.description = options.description
    this.once = options.once ?? false
  }

  public abstract run(...args: unknown[]): Awaitable<unknown>
}
