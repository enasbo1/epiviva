export interface FormFieldObject{
  name : string;
  title?:string;
  sclass? : string;
  type : FormFieldType;
  placeholder? : string|number;
  time?:boolean;
  default? : string|number;
  instruction? : string;
  reg_error?: {regex:RegExp; message:string}[];
  choices? : string[];
  _value?:FormFieldValue
  _values?:(Date|undefined)[];
  max?:Date;
  min?:Date;
  step?:number;
  number_limit?: {
    min?:number,
    max?:number
  };
}

export type FormFieldValue=string|Date|number|undefined

export const FormFieldTypeList = ["num","longtext","dropdown","text","email","password","place","date","period","url","file"] as const;

export type FormFieldType = typeof FormFieldTypeList[number]
