'use strict'

// Pull in our modules
const chalk = require('chalk')
const boxen = require('boxen')
const fs = require('fs')
const path = require('path')

// Define options for Boxen
const boxOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'round'
}

// NOTE:  the order of these define the order they are printed in the card...
const tags = [ 
  'work', 
  'oss', 
  'gmail', 
  'twitter', 
  'npm', 
  'github', 
  'linkedin', 
  'code', 
  'web', 
  'apps',
]

// NOTE:  initialize the socialData arrays...
const socialData = tags.reduce((obj, tag) => { obj[tag] = []; return obj}, {})

// Text + chalk definitions
//   oss: chalk.white('Node.js Community Committee ') + chalk.green('⬢'),
//   web: chalk.cyan('https://bnb.im'),
//
// NOTE:  you push your specific data into the socialData arrays...
//
socialData.work.push(chalk.white('Principle UI Engineer, UX/UI Engineering at Skava'))
socialData.gmail.push(chalk.cyan('eswat2') + chalk.gray('@gmail.com'))
socialData.gmail.push(chalk.cyan('eswat42') + chalk.gray('@gmail.com'))
socialData.twitter.push(chalk.gray('https://twitter.com/') + chalk.cyan('eswat2'))
socialData.npm.push(chalk.gray('https://npmjs.com/~') + chalk.cyan('eswat2'))
socialData.github.push(chalk.gray('https://github.com/') + chalk.cyan('eswat2'))
socialData.code.push(chalk.gray('https://codesandbox.io/u/') + chalk.cyan('eswat2'))
socialData.linkedin.push(chalk.gray('https://linkedin.com/in/') + chalk.cyan('eswat'))
socialData.apps.push(chalk.magenta('https://funnel-gfx.herokuapp.com/'))
socialData.apps.push(chalk.magenta('https://fire-notes.herokuapp.com/'))
socialData.apps.push(chalk.magenta('https://git-notes.herokuapp.com/'))

const data = {
  name: chalk.white.bold('Richard Hess'),
  handle: chalk.cyan('eswat2'),
  npx: chalk.gray('npx') + ' ' + chalk.cyan('eswat2'),
  social: socialData,
  labels: {
    work: chalk.white.bold('       Work:'),
    oss: chalk.white.bold('Open Source:'),
    gmail: chalk.white.bold('      Gmail:'),
    twitter: chalk.white.bold('    Twitter:'),
    npm: chalk.white.bold('        npm:'),
    github: chalk.white.bold('     GitHub:'),
    code: chalk.white.bold('     Coding:'),
    linkedin: chalk.white.bold('   LinkedIn:'),
    apps: chalk.white.bold('       apps:'),
    pad: chalk.white.bold('            '),
    web: chalk.white.bold('        Web:'),
    card: chalk.white.bold('       Card:'),
  }
}

const { name, handle, npx } = data
const { card, pad } = data.labels

// Actual strings we're going to output
const newline = '\n'
const heading = `${name} - ${handle}`
const carding = `${card}  ${npx}`

const notEmpty = (array) => {
  return array && (array.length > 0)
}

const reducer = (label, pad, newline) => {
  return (prev, current, indx) => {
    return prev + (indx == 0 ? label : pad) + '  ' + current + newline
  }
}

const items = tags.map((tag) => {
  const list = data.social[tag]
  const label = data.labels[tag]
  return notEmpty(list) ? list.reduce(reducer(label, pad, newline), '') : ''
})

// Put all our output together into a single variable so we can use boxen effectively
const output = heading + // data.name + data.handle
               newline + newline + // Add one whole blank line
               items.reduce((prev, item) => {
                 return prev + item
               }, '') +
               newline +
               carding

fs.writeFileSync(path.join(__dirname, 'bin/output'), chalk.green(boxen(output, boxOptions)))
