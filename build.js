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
  name: chalk.white.bold('Richard Hess'),
  handle: chalk.cyan('eswat2'),
  work: chalk.white('Principle UI Engineer, UX/UI Engineering at Skava'),
  oss: [],
  gmail: [
    chalk.cyan('eswat2') + chalk.gray('@gmail.com'),
    chalk.cyan('eswat42') + chalk.gray('@gmail.com'),
  ],
  twitter: chalk.gray('https://twitter.com/') + chalk.cyan('eswat2'),
  npm: chalk.gray('https://npmjs.com/~') + chalk.cyan('eswat2'),
  github: chalk.gray('https://github.com/') + chalk.cyan('eswat2'),
  linkedin: chalk.gray('https://linkedin.com/in/') + chalk.cyan('eswat'),
  web: [],
  apps: [ 
    chalk.magenta('https://funnel-gfx.herokuapp.com/'),
    chalk.magenta('https://fire-notes.herokuapp.com/'),
    chalk.magenta('https://git-notes.herokuapp.com/'), 
  ],
  npx: chalk.gray('npx') + ' ' + chalk.cyan('eswat2'),
  labelWork: chalk.white.bold('       Work:'),
  labelOss: chalk.white.bold('Open Source:'),
  labelGmail: chalk.white.bold('      Gmail:'),
  labelTwitter: chalk.white.bold('    Twitter:'),
  labelnpm: chalk.white.bold('        npm:'),
  labelGitHub: chalk.white.bold('     GitHub:'),
  labelLinkedIn: chalk.white.bold('   LinkedIn:'),
  labelApps: chalk.white.bold('       apps:'),
  labelPad: chalk.white.bold('            '),
  labelWeb: chalk.white.bold('        Web:'),
  labelCard: chalk.white.bold('       Card:')
}

// Actual strings we're going to output
const newline = '\n'
const heading = `${data.name} - ${data.handle}`
const working = `${data.labelWork}  ${data.work}`
const twittering = `${data.labelTwitter}  ${data.twitter}`
const npming = `${data.labelnpm}  ${data.npm}`
const githubing = `${data.labelGitHub}  ${data.github}`
const linkedining = `${data.labelLinkedIn}  ${data.linkedin}`
const carding = `${data.labelCard}  ${data.npx}`

const reducer = (label, pad, newline) => {
  return (prev, current, indx) => {
    return prev + (indx == 0 ? label : pad) + '  ' + current + newline
  }
}

const notEmpty = (array) => {
  return array && (array.length > 0)
}

const { apps, gmail, oss, web, labelApps, labelGmail, labelOss, labelPad, labelWeb } = data
const gmailing = notEmpty(gmail) ? gmail.reduce(reducer(labelGmail, labelPad, newline), '') : undefined
const apping = notEmpty(apps) ? apps.reduce(reducer(labelApps, labelPad, newline), '') : undefined
const ossing = notEmpty(oss) ? oss.reduce(reducer(labelOss, labelPad, newline), '') : undefined
const webing = notEmpty(web) ? web.reduce(reducer(labelWeb, labelPad, newline), '') : undefined

// Put all our output together into a single variable so we can use boxen effectively
const output = heading + // data.name + data.handle
               newline + newline + // Add one whole blank line
               working + newline +
               (ossing ? ossing + newline : '') +
               (gmailing ? gmailing : '') + 
               twittering + newline + 
               npming + newline + 
               githubing + newline + 
               linkedining + newline + 
               (webing ? webing : '' ) + 
               (apping ? apping : '') +
               newline +
               carding

fs.writeFileSync(path.join(__dirname, 'bin/output'), chalk.green(boxen(output, options)))
