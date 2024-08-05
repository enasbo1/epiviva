export interface RubricObject{
  title? : string
  content: RubricElement[]
}

export interface RubricElement{
  name : string
  type : "text"|"file"|"panel"|"modal"|"image"|"stars"|'link'
  text ?: string
  value? : string|RubricObject|number
  _open?:boolean
}
