import boxen from "boxen"
import pico from "picocolors"

import fs from "fs"
import path from "path"

const __dirname = path.resolve()

const { white, cyan, gray, green, magenta, bold, yellow } = pico.createColors()

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
  "email",
  "github",
  "linkedin",
  "mastodon",
  "npm",
  "resume",
  "angel",
  "code",
  "domains",
  "web",
  "site",
  "apps",
  "app",
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
socialData.email.push(cyan("eswat2") + gray("@gmail.com"))

// socialData.mastodon.push(gray("https://me.dm/") + cyan("@eswat2"))
// socialData.mastodon.push(gray("https://mstdn.social/") + cyan("@eswat42"))

socialData.github.push(gray("https://github.com/") + cyan("eswat2"))
socialData.github.push(gray("https://") + cyan("eswat2") + gray(".github.io"))
socialData.npm.push(gray("https://npmjs.com/~") + cyan("eswat2"))

socialData.domains.push(green("eswat2.app"))
socialData.domains.push(green("eswat2.dev"))
socialData.domains.push(green("eswat42.dev"))
socialData.domains.push(green("richardhess.dev"))

socialData.linkedin.push(gray("https://www.linkedin.com/in/") + cyan("eswat"))
socialData.resume.push(gray("https://mcp.") + cyan("eswat2") + gray(".app/resume"))
socialData.resume.push(gray("https://") + cyan("eswat2") + gray(".dev"))

// socialData.code.push(gray("https://codesandbox.io/u/") + cyan("eswat2"))
// socialData.angel.push(gray("https://angel.co/") + cyan("eswat2"))

socialData.site.push(yellow("https://eswat2.app"))
socialData.site.push(yellow("https://mcp.eswat2.app/intro"))
socialData.site.push(yellow("https://poker.eswat2.app/about"))
socialData.site.push(yellow("https://retro.eswat2.app/about"))
socialData.site.push(yellow("https://sudoku.eswat2.app/about"))
// socialData.app.push(yellow("https://sudoku.eswat2.app/api/puzzle"))

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
    app: whiteBold("         app:"),
    apps: whiteBold("        apps:"),
    card: whiteBold("        card:"),
    code: whiteBold("      coding:"),
    domains: whiteBold("     domains:"),
    github: whiteBold("      gitHub:"),
    email: whiteBold("       email:"),
    linkedin: whiteBold("    linkedIn:"),
    mastodon: whiteBold("    mastodon:"),
    npm: whiteBold("         npm:"),
    oss: whiteBold(" open source:"),
    pad: whiteBold("             "),
    resume: whiteBold("      resume:"),
    site: whiteBold("        site:"),
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
