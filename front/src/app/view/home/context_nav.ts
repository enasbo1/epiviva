import {SampleListElement} from "../../shared/foundation/list/listObject";
import {EpvPath} from "../routes";

export const context_nav : Record<string, SampleListElement[]>={
    'home' : [
        {link:'/'+EpvPath.login, value:'home.engage'},
    ],
    'visitor' : [
        {link:'/'+EpvPath.visitor.candidate, value:'home.engage'},
        {link:'/'+EpvPath.visitor.candidated.list, value:'home.engaged'},
    ],
    'rh' : [
        {link:'/'+EpvPath.rh.candidate.list, value:'home.candidates'}
    ],
    'admin' : [
        {link:'/'+EpvPath.admin.services.list, value:'service-list.title'},
        {link:'/'+EpvPath.admin.users.list, value:'user.list'},
    ]
}