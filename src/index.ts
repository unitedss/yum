import 'dotenv/config'
import BaseClient from './lib/BaseClient'
import { Client as Configuration } from './lib/Configuration'

const client = new BaseClient(Configuration)
void client.start()
