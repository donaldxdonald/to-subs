export interface AssStyleFormatV4 {
  name: string
  fontName: string
  fontSize: number
  primaryColor: string
  secondaryColor: string
  outlineColor: string
  backColor: string
  bold: 0 | 1
  italic: 0 | 1
  underline: 0 | 1
  strikeout: 0 | 1
  scaleX: number
  scaleY: number
  spacing: number
  angle: number
  borderStyle: number
  outline: number
  shadow: number
  alignment: number
  marginL: number
  marginR: number
  marginV: number
  encoding: number
}

export interface AssDialogueFormat {
  layer: number
  start: string
  end: string
  style: string
  name: string
  marginL: number
  marginR: number
  marginV: number
  effect: string
  text: string
}
