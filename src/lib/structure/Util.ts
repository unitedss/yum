import path from 'path'
import { glob } from 'glob'
import type BaseClient from '../BaseClient'
import type Command from './Command'
import type Event from './Event'

export default class Util {
  client: BaseClient
  public constructor(client: BaseClient) {
    this.client = client
  }

  public async loadCommands(): Promise<void> {
    const files = (await glob('dist/src/commands/**/*.js')).map(filePath =>
      path.resolve(filePath)
    )

    files.map(async (file: string) => {
      const command: Command = new (await import(file)).default(this.client)

      if (!command.name)
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split('').pop()} doesn't have name`)
        )

      this.client.commands.set(command.name, command)

      return delete require.cache[require.resolve(file)]
    })
  }

  public async loadEvents(): Promise<void> {
    const files = (await glob('dist/src/events/**/*.js')).map(filePath =>
      path.resolve(filePath)
    )

    files.map(async (file: string) => {
      const event: Event = new (await import(file)).default(this.client)

      if (!event.name)
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split('').pop()} doesn't have name`)
        )

      const execute = (...args: unknown[]) => event.run(...args)

      //@ts-ignore
      if (event.once) this.client.once(event.name, execute)
      //@ts-ignore
      else this.client.on(event.name, execute)

      return delete require.cache[require.resolve(file)]
    })
  }
}
