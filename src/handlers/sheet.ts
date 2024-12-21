import { normalize } from 'path'
import { parse } from 'node-xlsx'
import { AssDialogueFormat } from '../interface/subtitle'
import { defaultStylePair, generateBilingualSubtitle, generateDialogues, generateScriptInfo } from '../utils/genMeta'
import { convertRawTime } from '../utils/time'
import { AssHandler } from '../interface/handler'

export const parseSheetToASS: AssHandler = sheetPath => {
  const sheetFromFile = parse(normalize(sheetPath))
  const { data } = sheetFromFile[0]
  const rows = (data as string[][]).slice(1, -1)

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
