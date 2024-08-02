import type { EventEmitter } from 'node:events'
import type { Collection, Events, PermissionsString } from 'discord.js'
import type BaseClient from '../lib/BaseClient'

declare global {
  interface ClientOptions {
    token: string;
    prefix: string;
    debug: boolean;
    defaultPermissions: PermissionsString[];
  }

  interface CommandOptions {
    name: string
    description?: string
    memberPermissions?: PermissionsString[]
    clientPermissions?: PermissionsString[]
    disabled?: boolean
    context?: boolean
    options?: {
      type: number
      name: string
      description: string
      required?: boolean
    }[]
  }

  interface EventOptions {
    name: Events
    description: string
    once?: boolean
  }
}
