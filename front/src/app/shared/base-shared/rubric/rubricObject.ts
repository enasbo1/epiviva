export interface RubricObject{
  title? : string
  content: RubricElement[]
}

export interface RubricElement{
  name : string
  type : RubricType
  text ?: string
  value? : string|RubricObject|number
  _open?:boolean
}

export const RubricTypeList = ["text","file","panel","modal","image","stars","link", "hided"] as const;
export type RubricType = typeof RubricTypeList[number]

