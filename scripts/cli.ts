import cac from "cac"
import { join } from "path"
import { toSub } from "../src"
import { Options } from "../src/interface/cli"

const defaultOptions: Options = {
  output: join(__dirname, '../output'),
}

export async function main(options: Options = defaultOptions) {
  const cli = cac('to-subs')

  cli
    .command('[...files]', 'parse files', {
      ignoreOptionDefaultValue: true,
    })
    .option('-o, --output <dir>', 'custom output directory')
    .action((files: string[], flags) => {
      Object.assign(options, flags)

      options.entries = files
      toSub(options)
    })

  cli.help()
  cli.parse(process.argv, { run: false })

  await cli.runMatchedCommand()

}

main()
