import boxen from "boxen"
import pico from "picocolors"

import fs from 'fs'
import path from 'path'

const __dirname = path.resolve();

const { white, cyan, gray, green, magenta, bold } = pico.createColors()

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
//   oss: white('Node.js Community Committee ') + green('⬢'),
//   web: cyan('https://bnb.im'),
//
// NOTE:  you push your specific data into the socialData arrays...
//
socialData.work.push(white("Portfolio Technical Architect - UI/UX"))
socialData.work.push(white("Lead Technical Architect - UI"))
socialData.work.push(white("Lead Software Engineer - UI"))
socialData.work.push(white("UX/UI Engineering"))
socialData.gmail.push(cyan("eswat2") + gray("@gmail.com"))
socialData.gmail.push(cyan("eswat42") + gray("@gmail.com"))
socialData.twitter.push(
  gray("https://twitter.com/") + cyan("eswat2")
)
socialData.npm.push(gray("https://npmjs.com/~") + cyan("eswat2"))
socialData.github.push(gray("https://github.com/") + cyan("eswat2"))
socialData.github.push(
  gray("https://") + cyan("eswat2") + gray(".github.io")
)

socialData.domains.push(green("eswat2.dev"))
socialData.domains.push(green("eswat42.dev"))
socialData.domains.push(green("richardhess.dev"))

socialData.code.push(
  gray("https://codesandbox.io/u/") + cyan("eswat2")
)
socialData.linkedin.push(
  gray("https://www.linkedin.com/in/") + cyan("eswat")
)
socialData.angel.push(gray("https://angel.co/") + cyan("eswat2"))
socialData.apps.push(magenta("https://eswat2.github.io/auto-gql"))
socialData.apps.push(magenta("https://fire-notes.herokuapp.com"))
socialData.apps.push(magenta("https://funnel-r3t.vercel.app"))
socialData.apps.push(magenta("https://funnel-s4e.vercel.app"))
socialData.apps.push(magenta("https://funnel-sld.vercel.app"))
socialData.apps.push(magenta("https://funnel-vue.vercel.app"))
socialData.apps.push(magenta("https://git-notes-eswat2.vercel.app"))
socialData.apps.push(magenta("https://s4e-autos.vercel.app"))
socialData.apps.push(magenta("https://s4e-ikon-proofs.vercel.app"))
socialData.apps.push(magenta("https://s4e-proofs.vercel.app"))
socialData.apps.push(magenta("https://wc-autos.vercel.app"))
socialData.apps.push(magenta("https://wc-funnel.vercel.app"))
socialData.apps.push(magenta("https://wc-proofs.vercel.app"))
socialData.apps.push(magenta("https://wc-sudoku.vercel.app"))

const data = {
  name: white(bold("Richard Hess")),
  handle: cyan("eswat2"),
  npx: gray("npx") + " " + cyan("eswat2"),
  social: socialData,
  labels: {
    angel: white(bold("   AngelList:")),
    apps: white(bold("        apps:")),
    card: white(bold("        Card:")),
    code: white(bold("      Coding:")),
    domains: white(bold("     Domains:")),
    github: white(bold("      GitHub:")),
    gmail: white(bold("       Gmail:")),
    linkedin: white(bold("    LinkedIn:")),
    npm: white(bold("         npm:")),
    oss: white(bold(" Open Source:")),
    pad: white(bold("             ")),
    twitter: white(bold("     Twitter:")),
    web: white(bold("         Web:")),
    work: white(bold("        Work:")),
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
  green(boxen(output, boxOptions))
)
