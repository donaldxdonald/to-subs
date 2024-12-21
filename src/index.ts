import { access, constants, mkdirSync, writeFile } from 'fs'
import { join, normalize, parse } from 'path'
import { Options } from './interface/cli'
import { getHandlerByExt } from './handlers'

export function toSub(options: Options) {
  options.entries?.forEach(entry => {
    const { output } = options

    const parsedEntry = parse(entry)

    const outputDir = normalize(output || parsedEntry.dir)

    access(outputDir, constants.F_OK, async err => {
      if (err) {
        mkdirSync(outputDir)
      }

      const fileName = parsedEntry.name || 'output'
      const handler = getHandlerByExt(parsedEntry.ext)

      writeFile(join(outputDir, `${fileName}.ass`), await handler(entry), { encoding: 'utf-8' }, error => {
        if (error) {
          console.log('err', error)
          return
        }

        console.log(`Success! The subtitle file is at ${outputDir}`)
      })
    })
  })
}
