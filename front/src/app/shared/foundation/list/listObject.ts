import {TextStyle} from "../../base-shared/textStyle";

export interface ListObject {
  link ?: string;
  title?: string;
  image?: string;
  style?: string;
  right?: [
    TextStyle|null,
    TextStyle|null,
    TextStyle|null,
  ]
  mid?: [
    TextStyle|null,
    TextStyle|null,
    TextStyle|null,
  ];
  left?: [
    TextStyle|null,
    TextStyle|null,
    TextStyle|null,
  ];
  propriete ?: ListObjectPropriety[];
}

export interface ListObjectPropriety {
  name:string;
  value:string[]|string|number|bigint|boolean|undefined;
}
