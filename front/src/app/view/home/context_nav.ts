import {SampleListElement} from "../../shared/foundation/list/listObject";
import {EpvPath} from "../routes";

export const context_nav : Record<string, SampleListElement[]>={
    'home' : [
        {link:'/'+EpvPath.login, value:'home.engage'},
    ],
    'visitor' : [
        {link:'/'+EpvPath.visitor.candidate, value:'home.engage'},
    ]
}