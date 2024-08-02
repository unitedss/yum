import BaseClient from "../BaseClient";
import { glob } from "glob";
import path from "path";
import Event from "./Event";
import { globby } from "globby";
import { pathToFileURL, fileURLToPath } from "node:url";
import Command from "./Command";

export default class Util {
    client: BaseClient;
    directory: string;
    public constructor(client: BaseClient) {
        this.client = client;
        this.directory = fileURLToPath(new URL('../../', import.meta.url));
    }

    private isClass(input: unknown): boolean {
		return (
			typeof input === 'function' && typeof input.prototype === 'object' && input.toString().slice(0, 5) === 'class'
		);
	}

    public async loadCommands(): Promise<void> { 
        
        const files = (await glob(`dist/src/commands/**/*.js`)).map(filePath => path.resolve(filePath))

        files.map(async (file: string) => {
            const command: Command = new (await import(file)).default(this.client)

            if (!command.name) return delete require.cache[require.resolve(file)] && console.log(`${file.split("").pop()} doesn't have name`)

            this.client.commands.set(command.name, command)

            return delete require.cache[require.resolve(file)]
        })
    }
    
    public async loadEvents(): Promise<void> { 
        
        const files = (await glob(`dist/src/events/**/*.js`)).map(filePath => path.resolve(filePath))

        files.map(async (file: string) => {
            const event: Event = new (await import(file)).default(this.client)

            if (!event.name) return delete require.cache[require.resolve(file)] && console.log(`${file.split("").pop()} doesn't have name`)

            const execute = (...args: any) => event.run(...args)

            //@ts-ignore
            if(event.once) this.client.once(event.name, execute);
            //@ts-ignore
            else this.client.on(event.name, execute)

            return delete require.cache[require.resolve(file)]
        })
    }
}