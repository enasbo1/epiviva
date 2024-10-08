import {SampleListElement} from "../../shared/foundation/list/listObject";
import {EpvPath} from "../routes";

export const context_nav : Record<string, SampleListElement[]>={
    'home' : [
        {link:'/'+EpvPath.login, value:'home.engage'},
        {link:'/'+EpvPath.login, value:'home.ask'},

    ],
    'visitor' : [
        {link:'/'+EpvPath.visitor.candidate, value:'home.engage'},
        {link:'/'+EpvPath.visitor.candidated.list, value:'home.engaged'},
        {link:'/'+EpvPath.visitor.gift.root, value:'gift.give'},
        {link:'/'+EpvPath.visitor.benefit.root, value:'home.ask'},

    ],
    'rh' : [
        {link:'/'+EpvPath.rh.candidate.list, value:'home.candidates'},
        {link:'/'+EpvPath.rh.benefit.list, value:'benefit.list'},
        {link:'/'+EpvPath.rh.gift.list, value:'gift.name'},
        {link:'/'+EpvPath.rh.sector.list, value:'sector.list_title'},
        {link:'/'+EpvPath.rh.volunteer.list, value:'volunteer.username'}
    ],
    'admin' : [
        {link:'/'+EpvPath.admin.services.list, value:'service-list.title'},
        {link:'/'+EpvPath.admin.users.list, value:'user.list'},
    ]
}