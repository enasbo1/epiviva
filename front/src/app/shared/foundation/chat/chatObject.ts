import {UserRecap} from "../../../http/model/user-model/userObject";

export interface ChatObject{
  user ?: UserRecap;
  content:string;
  date: Date
}
