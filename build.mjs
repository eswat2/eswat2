import boxen from "boxen"
import pico from "picocolors"

import fs from "fs"
import path from "path"

const __dirname = path.resolve()

const { white, cyan, gray, green, magenta, bold } = pico.createColors()

const whiteBold = (label) => white(bold(label))

// Define options for Boxen
const boxOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
}

// NOTE:  the order of these define the order they are printed in the card...
const tags = [
  "title",
  "work",
  "oss",
  "gmail",
  "mastodon",
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
socialData.title.push(green("Principal Architect"))
socialData.work.push(white("Portfolio Technical Architect - UI/UX"))
socialData.work.push(white("Lead Technical Architect - UI"))
socialData.work.push(white("Lead Software Engineer - UI"))
socialData.work.push(white("UX/UI Engineering"))
socialData.gmail.push(cyan("eswat2") + gray("@gmail.com"))
socialData.mastodon.push(gray("https://me.dm/") + cyan("@eswat2"))
socialData.mastodon.push(gray("https://mstdn.social/") + cyan("@eswat42"))
socialData.npm.push(gray("https://npmjs.com/~") + cyan("eswat2"))
socialData.github.push(gray("https://github.com/") + cyan("eswat2"))
socialData.github.push(gray("https://") + cyan("eswat2") + gray(".github.io"))

socialData.domains.push(green("eswat2.dev"))
socialData.domains.push(green("eswat42.dev"))
socialData.domains.push(green("richardhess.dev"))

socialData.code.push(gray("https://codesandbox.io/u/") + cyan("eswat2"))
socialData.linkedin.push(gray("https://www.linkedin.com/in/") + cyan("eswat"))
socialData.angel.push(gray("https://angel.co/") + cyan("eswat2"))
socialData.apps.push(magenta("https://autos-lit.vercel.app"))
socialData.apps.push(magenta("https://autos-p4t.vercel.app"))
socialData.apps.push(magenta("https://autos-s4e.vercel.app"))
socialData.apps.push(magenta("https://autos-sld.vercel.app"))
socialData.apps.push(magenta("https://funnel-lit.vercel.app"))
socialData.apps.push(magenta("https://funnel-p4t.vercel.app"))
socialData.apps.push(magenta("https://funnel-r3t.vercel.app"))
socialData.apps.push(magenta("https://funnel-s4e.vercel.app"))
socialData.apps.push(magenta("https://funnel-sld.vercel.app"))
socialData.apps.push(magenta("https://funnel-vue.vercel.app"))
socialData.apps.push(magenta("https://rust-sudoku-wc.netlify.app"))
socialData.apps.push(magenta("https://sudoku-rust-api.vercel.app/api/puzzle"))
socialData.apps.push(magenta("https://sudoku-lit.vercel.app"))
socialData.apps.push(magenta("https://sudoku-p4t.vercel.app"))
socialData.apps.push(magenta("https://sudoku-s4e.vercel.app"))
socialData.apps.push(magenta("https://sudoku-sld.vercel.app"))
socialData.apps.push(magenta("https://wc-autos.vercel.app"))
socialData.apps.push(magenta("https://wc-funnel.vercel.app"))
socialData.apps.push(magenta("https://wc-sudoku.vercel.app"))
socialData.apps.push(magenta("https://wc-xplor.vercel.app"))

const data = {
  name: whiteBold("Richard Hess"),
  handle: cyan("eswat2"),
  npx: gray("npx") + " " + cyan("eswat2"),
  social: socialData,
  labels: {
    angel: whiteBold("   angelList:"),
    apps: whiteBold("        apps:"),
    card: whiteBold("        card:"),
    code: whiteBold("      coding:"),
    domains: whiteBold("     domains:"),
    github: whiteBold("      gitHub:"),
    gmail: whiteBold("       gmail:"),
    linkedin: whiteBold("    linkedIn:"),
    mastodon: whiteBold("    mastodon:"),
    npm: whiteBold("         npm:"),
    oss: whiteBold(" open source:"),
    pad: whiteBold("             "),
    title: whiteBold("       title:"),
    web: whiteBold("         web:"),
    work: whiteBold("        work:"),
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
