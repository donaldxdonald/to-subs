import { AssHandler } from '../interface/handler'
import { parseCSVToASS } from './csv'
import { parseSheetToASS } from './sheet'

export function getHandlerByExt(ext: string): AssHandler {
  switch (ext) {
    case '.xlsx':
      return parseSheetToASS

    case '.csv':
      return parseCSVToASS

    default:
      return parseSheetToASS
  }
}
