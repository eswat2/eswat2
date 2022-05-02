import pico from "picocolors"
import boxen from "boxen"

import fs from 'fs'
import path from 'path'

const __dirname = path.resolve();

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

// Text + pico definitions
//   oss: pico.white('Node.js Community Committee ') + pico.green('⬢'),
//   web: pico.cyan('https://bnb.im'),
//
// NOTE:  you push your specific data into the socialData arrays...
//
socialData.work.push(pico.white("Portfolio Technical Architect - UI/UX"))
socialData.work.push(pico.white("Lead Technical Architect - UI"))
socialData.work.push(pico.white("Lead Software Engineer - UI"))
socialData.work.push(pico.white("UX/UI Engineering"))
socialData.gmail.push(pico.cyan("eswat2") + pico.gray("@gmail.com"))
socialData.gmail.push(pico.cyan("eswat42") + pico.gray("@gmail.com"))
socialData.twitter.push(
  pico.gray("https://twitter.com/") + pico.cyan("eswat2")
)
socialData.npm.push(pico.gray("https://npmjs.com/~") + pico.cyan("eswat2"))
socialData.github.push(pico.gray("https://github.com/") + pico.cyan("eswat2"))
socialData.github.push(
  pico.gray("https://") + pico.cyan("eswat2") + pico.gray(".github.io")
)

socialData.domains.push(pico.green("eswat2.dev"))
socialData.domains.push(pico.green("eswat42.dev"))
socialData.domains.push(pico.green("richardhess.dev"))

socialData.code.push(
  pico.gray("https://codesandbox.io/u/") + pico.cyan("eswat2")
)
socialData.linkedin.push(
  pico.gray("https://www.linkedin.com/in/") + pico.cyan("eswat")
)
socialData.angel.push(pico.gray("https://angel.co/") + pico.cyan("eswat2"))
socialData.apps.push(pico.magenta("https://eswat2.github.io/auto-gql"))
socialData.apps.push(pico.magenta("https://fire-notes.herokuapp.com"))
socialData.apps.push(pico.magenta("https://funnel-r3t.vercel.app"))
socialData.apps.push(pico.magenta("https://funnel-s4e.vercel.app"))
socialData.apps.push(pico.magenta("https://funnel-sld.vercel.app"))
socialData.apps.push(pico.magenta("https://funnel-vue.vercel.app"))
socialData.apps.push(pico.magenta("https://git-notes-eswat2.vercel.app"))
socialData.apps.push(pico.magenta("https://s4e-autos.vercel.app"))
socialData.apps.push(pico.magenta("https://s4e-ikon-proofs.vercel.app"))
socialData.apps.push(pico.magenta("https://s4e-proofs.vercel.app"))
socialData.apps.push(pico.magenta("https://wc-autos.vercel.app"))
socialData.apps.push(pico.magenta("https://wc-funnel.vercel.app"))
socialData.apps.push(pico.magenta("https://wc-proofs.vercel.app"))
socialData.apps.push(pico.magenta("https://wc-sudoku.vercel.app"))

const data = {
  name: pico.white(pico.bold("Richard Hess")),
  handle: pico.cyan("eswat2"),
  npx: pico.gray("npx") + " " + pico.cyan("eswat2"),
  social: socialData,
  labels: {
    angel: pico.white(pico.bold("   AngelList:")),
    apps: pico.white(pico.bold("        apps:")),
    card: pico.white(pico.bold("        Card:")),
    code: pico.white(pico.bold("      Coding:")),
    domains: pico.white(pico.bold("     Domains:")),
    github: pico.white(pico.bold("      GitHub:")),
    gmail: pico.white(pico.bold("       Gmail:")),
    linkedin: pico.white(pico.bold("    LinkedIn:")),
    npm: pico.white(pico.bold("         npm:")),
    oss: pico.white(pico.bold(" Open Source:")),
    pad: pico.white(pico.bold("             ")),
    twitter: pico.white(pico.bold("     Twitter:")),
    web: pico.white(pico.bold("         Web:")),
    work: pico.white(pico.bold("        Work:")),
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
  pico.green(boxen(output, boxOptions))
)
