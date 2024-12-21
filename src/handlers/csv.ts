import { normalize } from 'path'
import { readFile } from 'fs/promises'
import { parse } from 'csv/sync'
import { defaultStylePair, generateBilingualSubtitle, generateDialogues, generateScriptInfo } from '../utils/genMeta'
import { convertRawTime } from '../utils/time'
import type { AssHandler } from '../interface/handler'
import type { AssDialogueFormat } from '../interface/subtitle'

export const parseCSVToASS: AssHandler = async sheetPath => {
  const file = await readFile(normalize(sheetPath))

  const rows = parse(file, {
    quote: false,
  }) as string[][]

  const keys = (rows.shift() || []).map(v => v.toLowerCase())
  if (keys.length === 0) {
    throw new Error('no keys')
  }

  let newAssText = generateScriptInfo(defaultStylePair)

  const dialogues = rows.reduce((result, row, curIndex, arr) => {
    const [time, original, translated] = row

    const endTime = curIndex === arr.length - 1 ? '9:00:00' : arr[curIndex + 1][0]

    const dialogue: AssDialogueFormat = {
      layer: 0,
      start: convertRawTime(time),
      end: convertRawTime(endTime),
      style: 'CHS',
      name: '',
      marginL: 0,
      marginR: 0,
      marginV: 0,
      effect: '',
      text: generateBilingualSubtitle(original, translated),
    }

    result.push(dialogue)

    return result
  }, [] as AssDialogueFormat[])

  newAssText += generateDialogues(dialogues)

  return newAssText
}
