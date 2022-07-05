import { PathLike } from 'fs'
import { parse } from 'node-xlsx'
import { AssDialogueFormat, AssStyleFormatV4 } from '../interface/subtitle'
import { generateDialogues, generateScriptInfo } from './genMeta'
import { convertRawTime } from './time'

const defaultCNSStyle: AssStyleFormatV4 = {
  name: "CHS",
  fontName: "Default",
  fontSize: 18,
  primaryColor: "&H00FFFFFF",
  secondaryColor: "&H000000FF",
  outlineColor: "&H00000000",
  backColor: "&H00000000",
  bold: 0,
  italic: 0,
  underline: 0,
  strikeout: 0,
  scaleX: 100,
  scaleY: 100,
  spacing: 0,
  angle: 0,
  borderStyle: 1,
  outline: 1,
  shadow: 1,
  alignment: 2,
  marginL: 10,
  marginR: 10,
  marginV: 10,
  encoding: 1,
}

const defaultENGStyle: AssStyleFormatV4 = {
  name: "ENG",
  fontName: "Jost",
  fontSize: 15,
  primaryColor: "&H0000FFFF",
  secondaryColor: "&H000000FF",
  outlineColor: "&H00000000",
  backColor: "&H00000000",
  bold: 0,
  italic: 0,
  underline: 0,
  strikeout: 0,
  scaleX: 100,
  scaleY: 100,
  spacing: 0,
  angle: 0,
  borderStyle: 1,
  outline: 1,
  shadow: 1,
  alignment: 2,
  marginL: 10,
  marginR: 10,
  marginV: 10,
  encoding: 1,
}

export function parseSheetToASS(sheetPath: PathLike): string {
  const sheetFromFile = parse(sheetPath)
  const { data } = sheetFromFile[0]
  const rows = (data as string[][]).slice(1, -1)

  let newAssText = generateScriptInfo([defaultCNSStyle, defaultENGStyle])

  const dialogues = rows.reduce((result, row, curIndex, arr) => {
    const [time, origin, translated] = row

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
      text: `${trimLineBreak(translated)} \\N {\\rENG} ${trimLineBreak(origin)}`,
    }

    result.push(dialogue)

    return result
  }, [] as AssDialogueFormat[])

  newAssText += generateDialogues(dialogues)

  return newAssText
}

function trimLineBreak(content: string): string {
  return content.replaceAll('\n', '')
}
