// scripts/inject-newrelic.js
const fs = require('fs')
const path = require('path')

const candidates = [
  path.resolve(process.cwd(), '.next/standalone/server.js'),
  path.resolve(process.cwd(), '.next/standalone/server/server.js') // some setups nest server.js
]

const file = candidates.find(fs.existsSync)
if (!file) {
  console.error('server.js not found under .next/standalone')
  process.exit(1)
}

const src = fs.readFileSync(file, 'utf8')

// idempotent: skip if already injected
if (src.includes(`require('newrelic')`) || src.includes(`require("newrelic")`)) {
  console.log('newrelic already required in server.js')
  process.exit(0)
}

// optional backup
fs.writeFileSync(file + '.bak', src, 'utf8')

// prepend at the very top for earliest initialization
const out = `require('newrelic')\n${src}`
fs.writeFileSync(file, out, 'utf8')
console.log(`Injected require('newrelic') into ${file}`)
