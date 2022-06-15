import { access, constants, mkdirSync, writeFile } from 'fs'
import { join } from 'path'
import { parseSheetToASS } from './utils/sheet'

const outputDir = join(__dirname, '../output')

access(outputDir, constants.F_OK, err => {
  if (err) {
    mkdirSync(outputDir)
  }

  writeFile(join(__dirname, '../output/output.ass'), parseSheetToASS(join(__dirname, '../sub.xlsx')), { encoding: 'utf-8' }, err => {
    err && console.log('err', err)
  })
})
