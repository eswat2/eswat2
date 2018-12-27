'use strict'

// Pull in our modules
const chalk = require('chalk')
const boxen = require('boxen')
const fs = require('fs')
const path = require('path')

// Define options for Boxen
const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round'
}

// Text + chalk definitions
//   opensource: chalk.white('Node.js Community Committee ') + chalk.green('⬢'),
//   web: chalk.cyan('https://bnb.im'),
const data = {
  name: chalk.white('              Richard Hess'),
  handle: chalk.cyan('eswat2'),
  work: chalk.white('Principle UI Engineer, UX/UI Engineering at Skava'),
  gmail: chalk.cyan('eswat2') + chalk.gray('@gmail.com'),
  twitter: chalk.gray('https://twitter.com/') + chalk.cyan('eswat2'),
  npm: chalk.gray('https://npmjs.com/~') + chalk.cyan('eswat2'),
  github: chalk.gray('https://github.com/') + chalk.cyan('eswat2'),
  linkedin: chalk.gray('https://linkedin.com/in/') + chalk.cyan('eswat'),
  npx: chalk.gray('npx') + ' ' + chalk.cyan('eswat2'),
  labelWork: chalk.white.bold('       Work:'),
  labelOpenSource: chalk.white.bold('Open Source:'),
  labelGmail: chalk.white.bold('      Gmail:'),
  labelTwitter: chalk.white.bold('    Twitter:'),
  labelnpm: chalk.white.bold('        npm:'),
  labelGitHub: chalk.white.bold('     GitHub:'),
  labelLinkedIn: chalk.white.bold('   LinkedIn:'),
  labelWeb: chalk.white.bold('        Web:'),
  labelCard: chalk.white.bold('       Card:')
}

// Actual strings we're going to output
const newline = '\n'
const heading = `${data.name} - ${data.handle}`
const working = `${data.labelWork}  ${data.work}`
const opensourcing = data.opensource ? `${data.labelOpenSource}  ${data.opensource}` : undefined
const gmailing = data.gmail ? `${data.labelGmail}  ${data.gmail}` : undefined
const twittering = `${data.labelTwitter}  ${data.twitter}`
const npming = `${data.labelnpm}  ${data.npm}`
const githubing = `${data.labelGitHub}  ${data.github}`
const linkedining = `${data.labelLinkedIn}  ${data.linkedin}`
const webing = data.web ? `${data.labelWeb}  ${data.web}` : undefined
const carding = `${data.labelCard}  ${data.npx}`

// Put all our output together into a single variable so we can use boxen effectively
const output = heading + // data.name + data.handle
               newline + newline + // Add one whole blank line
               working + newline + // data.labelWork + data.work
               (opensourcing ? opensourcing + newline + newline : '') + // data.labelOpenSource + data.opensource
               (gmailing ? gmailing + newline : '') + 
               twittering + newline + // data.labelTwitter + data.twitter
               npming + newline + // data.labelnpm + data.npm
               githubing + newline + // data.labelGitHub + data.github
               linkedining + newline + // data.labelLinkedIn + data.linkedin
               (webing ? webing + newline : '' ) + newline + // data.labelWeb + data.web
               carding // data.labelCard + data.npx

fs.writeFileSync(path.join(__dirname, 'bin/output'), chalk.green(boxen(output, options)))
