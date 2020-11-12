#!/usr/bin/env node

import execute from './commands.js'

const command = process.argv[2]
execute(command)
