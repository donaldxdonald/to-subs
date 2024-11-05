import { AssHandler } from '../interface/handler'
import { parseSheetToASS } from './sheet'

export function getHandlerByExt(ext: string): AssHandler {
  switch (ext) {
    case '.xlsx':
      return parseSheetToASS

    default:
      return parseSheetToASS
  }
}
