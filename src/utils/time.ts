import dayjs from 'dayjs'
import * as customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat.default)

export function formatTime(rawTime: string, rawFormat: string): string {
  return dayjs(rawTime, rawFormat).format('H:mm:ss.00')
}

export function convertRawTime(time: string): string {
  const timeList = time.split(':')

  let format = ''
  if (timeList.length === 1 && timeList[0].endsWith('s')) {
    format = 'ss'
  } else if (timeList.length === 2) {
    format = 'mm:ss'
  } else if (timeList.length === 3) {
    format = 'H:mm:ss'
  }

  return formatTime(time, format)
}
