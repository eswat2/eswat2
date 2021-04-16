"use strict"

// Pull in our modules
const chalk = require("chalk")
const boxen = require("boxen")
const fs = require("fs")
const path = require("path")

// Define options for Boxen
const boxOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
}

// NOTE:  the order of these define the order they are printed in the card...
const tags = [
  "work",
  "oss",
  "gmail",
  "twitter",
  "npm",
  "github",
  "linkedin",
  "angel",
  "code",
  "domains",
  "web",
  "apps",
]

// NOTE:  initialize the socialData arrays...
const socialData = tags.reduce((obj, tag) => {
  obj[tag] = []
  return obj
}, {})

// Text + chalk definitions
//   oss: chalk.white('Node.js Community Committee ') + chalk.green('⬢'),
//   web: chalk.cyan('https://bnb.im'),
//
// NOTE:  you push your specific data into the socialData arrays...
//
socialData.work.push(chalk.white("Portfolio Technical Architect - UI/UX"))
socialData.work.push(chalk.white("Lead Technical Architect - UI"))
socialData.work.push(chalk.white("Lead Software Engineer - UI"))
socialData.work.push(chalk.white("UX/UI Engineering"))
socialData.gmail.push(chalk.cyan("eswat2") + chalk.gray("@gmail.com"))
socialData.gmail.push(chalk.cyan("eswat42") + chalk.gray("@gmail.com"))
socialData.twitter.push(
  chalk.gray("https://twitter.com/") + chalk.cyan("eswat2")
)
socialData.npm.push(chalk.gray("https://npmjs.com/~") + chalk.cyan("eswat2"))
socialData.github.push(chalk.gray("https://github.com/") + chalk.cyan("eswat2"))
socialData.github.push(
  chalk.gray("https://") + chalk.cyan("eswat2") + chalk.gray(".github.io")
)

socialData.domains.push(chalk.green("eswat2.dev"))
socialData.domains.push(chalk.green("eswat42.dev"))
socialData.domains.push(chalk.green("richardhess.dev"))

socialData.code.push(
  chalk.gray("https://codesandbox.io/u/") + chalk.cyan("eswat2")
)
socialData.linkedin.push(
  chalk.gray("https://www.linkedin.com/in/") + chalk.cyan("eswat")
)
socialData.angel.push(chalk.gray("https://angel.co/") + chalk.cyan("eswat2"))
socialData.apps.push(chalk.magenta("https://eswat2.github.io/CRA-Social-Icons"))
socialData.apps.push(chalk.magenta("https://eswat2.github.io/auto-gql"))
socialData.apps.push(chalk.magenta("https://eswat2.github.io/git-notes"))
socialData.apps.push(chalk.magenta("https://fire-notes.herokuapp.com"))
socialData.apps.push(chalk.magenta("https://funnel-r3t.eswat2.vercel.app"))
socialData.apps.push(chalk.magenta("https://funnel-s4e.eswat2.vercel.app"))
socialData.apps.push(chalk.magenta("https://funnel-vue.eswat2.vercel.app"))
socialData.apps.push(chalk.magenta("https://gt-sports.eswat2.vercel.app"))
socialData.apps.push(chalk.magenta("https://s4e-autos.eswat2.vercel.app"))
socialData.apps.push(chalk.magenta("https://s4e-ikon-proofs.eswat2.vercel.app"))
socialData.apps.push(chalk.magenta("https://s4e-proofs.eswat2.vercel.app"))
socialData.apps.push(chalk.magenta("https://wc-funnel.vercel.app"))
socialData.apps.push(chalk.magenta("https://wc-proofs.vercel.app"))

const data = {
  name: chalk.white.bold("Richard Hess"),
  handle: chalk.cyan("eswat2"),
  npx: chalk.gray("npx") + " " + chalk.cyan("eswat2"),
  social: socialData,
  labels: {
    angel: chalk.white.bold("   AngelList:"),
    apps: chalk.white.bold("        apps:"),
    card: chalk.white.bold("        Card:"),
    code: chalk.white.bold("      Coding:"),
    domains: chalk.white.bold("     Domains:"),
    github: chalk.white.bold("      GitHub:"),
    gmail: chalk.white.bold("       Gmail:"),
    linkedin: chalk.white.bold("    LinkedIn:"),
    npm: chalk.white.bold("         npm:"),
    oss: chalk.white.bold(" Open Source:"),
    pad: chalk.white.bold("             "),
    twitter: chalk.white.bold("     Twitter:"),
    web: chalk.white.bold("         Web:"),
    work: chalk.white.bold("        Work:"),
  },
}

const { name, handle, npx } = data
const { card, pad } = data.labels

// Actual strings we're going to output
const newline = "\n"
const heading = `${name} - ${handle}`
const carding = `${card}  ${npx}`

const notEmpty = (array) => {
  return array && array.length > 0
}

const reducer = (label, pad, newline) => {
  return (prev, current, indx) => {
    return prev + (indx == 0 ? label : pad) + "  " + current + newline
  }
}

const items = tags.map((tag) => {
  const list = data.social[tag]
  const label = data.labels[tag]
  return notEmpty(list) ? list.reduce(reducer(label, pad, newline), "") : ""
})

// Put all our output together into a single variable so we can use boxen effectively
const output =
  heading + // data.name + data.handle
  newline +
  newline + // Add one whole blank line
  items.reduce((prev, item) => {
    return prev + item
  }, "") +
  newline +
  carding

fs.writeFileSync(
  path.join(__dirname, "bin/output"),
  chalk.green(boxen(output, boxOptions))
)
