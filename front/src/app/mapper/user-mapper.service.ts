import {EventEmitter, Injectable} from '@angular/core';
import {
    UserGivingObject,
    UserMin,
    UserObject,
    UserPatch,
    UserRecap,
    UserVolunteerObject
} from "../http/model/user-model/userObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../shared/foundation/form/form.service";
import {RegexBase} from "../shared/RegexBase";
import {LanguageService} from "../shared/base-shared/language.service";
import {AddressMapperService} from "./address-mapper.service";

@Injectable({
    providedIn: 'root'
})
export class UserMapperService {
    static rolesList = [
        'banned',
        'visitor',
        'volunteer',
        'rh',
        'admin',
        'system'

    ]

    static language_key_rolesList = UserMapperService.rolesList.map(x=>`user.roles.${x}`);


    static roles : Record<string,string> = {
        '0': UserMapperService.rolesList[0],
        '1': UserMapperService.rolesList[1],
        '2': UserMapperService.rolesList[2],
        '3': UserMapperService.rolesList[3],
        '4': UserMapperService.rolesList[4],
        '5': UserMapperService.rolesList[5],
    }

    static get_U_Name(user?: { prenom:string, nom:string }, fullname:boolean=false):string{
        if (fullname && user){
            return `${user.prenom[0].toUpperCase() + user.prenom.slice(1).toLowerCase()} ${user.nom.toUpperCase()}`
        }
        let i:string|undefined = user?.prenom;
        i = i?i[0].toUpperCase():'';
        return i+". " +user?.nom.toUpperCase()
    }

    static model_to_list(user?:UserRecap, detailPage?:string):ListObject{
        return {
            title:UserMapperService.get_U_Name(user, true),
            link:detailPage?.replace(':id',user?.id?.toString()??'0'),
            right:[
                {text : "Mail : " + user?.mail},
                {text : "Nom : " + user?.nom },
                {text : "Prenom : " + user?.prenom }
            ],
            left:[
                null,
                null,
                {text: 'Role : ' + LanguageService.static_resolve(`user.roles.${UserMapperService.roles[user?.status?? '0']}`), style:'font-weight:bold;'}
            ],
            properties:[
                {name : 'connexion.email' , value: user?.mail},
                {name : 'user.first_name' , value: user?.nom},
                {name : 'user.name' , value: user?.prenom},
                {name : 'number', value: user?.id},
                {name : 'role', value: UserMapperService.roles[user?.status?? '0']},
            ]
        }
    }

    static giving_to_list(user?:UserGivingObject, detailPage?:string):ListObject{
        return {
            title:UserMapperService.get_U_Name(user, true),
            link:detailPage?.replace(':id',user?.id?.toString()??'0'),
            right:[
                {text : `${LanguageService.static_resolve('address.title')} :  ${AddressMapperService.get_address(user?.address)}`},
                {text : `${LanguageService.static_resolve('gift.name')} :  ${user?.gift}`,},
                null
            ],
            left:[
                null,
                null,
                {text: 'Role : ' + LanguageService.static_resolve(`user.roles.${UserMapperService.roles[user?.status?? '0']}`), style:'font-weight:bold;'}
            ],
            properties:[
                {name: 'address.title', value: AddressMapperService.get_address(user?.address)},
                {name : 'connexion.email' , value: user?.mail},
                {name : 'user.first_name' , value: user?.nom},
                {name : 'user.name' , value: user?.prenom},
                {name : 'number', value: user?.id},
                {name : 'role', value: UserMapperService.roles[user?.status?? '0']},
            ]
        }
    }

    static model_to_rubric(user:UserObject, title?:string):RubricObject{
        return {
            title : "user.title",
            content:[
                {name:'user.name', type:'text', text:`${user.prenom[0].toUpperCase()}${user.prenom.slice(1).toLowerCase()}`},
                {name:'user.first_name', type:'text', text:user.nom.toUpperCase()},
                {name:'user.mail', type:'text', text: user.mail},
                {name:'user.num', type:'text', text: user.num},
                {name:'user.status', type:'text', text: `user.roles.${UserMapperService.roles[user.status]}`}
            ]
        };
    }

    static model_to_form(user?:UserObject, title?:string):FormStepObject[]{
        return [
            {
                title:title,
                errorEvent:new EventEmitter<string>(),
                content :[
                    {
                        title : 'user.identity',
                        online:true,
                        content:[
                            {
                                name:"nom",
                                title:"user.first_name",
                                type : "text",
                                placeholder:"Dupond",
                                default:user?.nom,
                                reg_error: [
                                    {regex: RegexBase.required, message: "user.reg_error.first_name"},
                                ]
                            },
                            {
                                name:"prenom",
                                title:"user.name",
                                type : "text",
                                placeholder:"Timéo",
                                default:user?.prenom,
                                reg_error: [
                                    {regex: RegexBase.required, message: "user.reg_error.name"},
                                ]
                            },

                        ]
                    },
                    {
                        title:"user.contact",
                        content:[
                            {
                                name:"mail",
                                title:"user.email",
                                type : "email",
                                placeholder:"timeo.dupond@mail.com",
                                default:user?.mail,
                                reg_error: [
                                    {regex: RegexBase.required, message: "user.reg_error.email"},
                                ]
                            },
                            {
                                name:"num",
                                title:"user.num",
                                type: "text",
                                default: user?.num,
                                placeholder: "0786791542",
                                reg_error:[
                                    {regex: RegexBase.tel, message:'user.reg_error.num_val'}
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                errorEvent:new EventEmitter<string>(),
                validator:(step:FormStepObject):EventEmitter<boolean>|boolean=>{
                    const n = FormService.require_values(step.content[2].content, ["role"])
                    if (n){
                        step.errorEvent?.emit("le champ "+n+" doit être rempli");
                        return false;
                    }
                    step.errorEvent?.emit("");
                    return true;
                },
                content:[
                    {
                        title:"Mot de passe",
                        content:[
                            {
                                name:"mdp",
                                type:"password",
                                placeholder: "******"
                            },
                        ]
                    },
                    {
                        title:"Role",
                        content:[
                            {
                                name:"role",
                                type:"dropdown",
                                default: `user.roles.${UserMapperService.roles[user?.status??'0']}`,
                                choices: UserMapperService.rolesList.map(x=>`user.roles.${x}`)
                            },
                        ]
                    }
                ]
            }
        ]
    }

    static form_to_model(values:FormFieldObject[], user?:UserPatch):UserPatch{
        const mdp = FormService.get_value(values, "mdp")
        return {
            id: user?.id??0, address_id: user?.address_id??0,
            num: (FormService.get_value(values, "num", user?.num) as string),
            prenom: (FormService.get_value(values, "prenom") as string).toUpperCase(),
            nom: (FormService.get_value(values, "nom") as string).toUpperCase(),
            mail: (FormService.get_value(values, "mail") as string).toLowerCase(),
            mdp: mdp?mdp as string:undefined,
            status: (UserMapperService.language_key_rolesList.indexOf(FormService.get_value(values, "role") as string)).toString().toLowerCase()
        }
    }

    static modelRecap_to_rubric(user?: UserRecap):RubricObject {
        return {
            title : "user.title",
            content:[
                {name:'user.name', type:'text', text:`${user?.prenom[0].toUpperCase()}${user?.prenom.slice(1).toLowerCase()}`},
                {name:'user.first_name', type:'text', text:user?.nom.toUpperCase()},
                {name:'user.mail', type:'text', text: user?.mail},
                {name:'user.num', type:'text', text: user?.num},
                {name:'user.status', type:'text', text: `user.roles.${UserMapperService.roles[user?.status?? '']}`}
            ]
        };
    }

    static volunteer_to_list(user: UserVolunteerObject, detailPage: string) :ListObject{
        const sector:string[]= user.distribute.map(x=>x.sector.nom);
        if (sector.length>2){
            sector[2] = '...'
            sector.splice(3);
        }
        return {
            title:UserMapperService.get_U_Name(user, true),
            link:detailPage?.replace(':id',user?.id?.toString()??'0'),
            right:[
                {text : "Mail : " + user?.mail},
                {text : `${LanguageService.static_resolve('address.title')} : ${AddressMapperService.get_address(user.address)}`},
                {text : `${LanguageService.static_resolve('volunteer.affects')} : ${sector.join(', ')}`}
            ],
            left:[
                null,
                null,
                {text: 'Role : ' + LanguageService.static_resolve(`user.roles.${UserMapperService.roles[user?.status?? '0']}`), style:'font-weight:bold;'}
            ],
            properties:[
                {name : 'connexion.email' , value: user?.mail},
                {name : 'user.first_name' , value: user?.nom},
                {name : 'user.name' , value: user?.prenom},
                {name : 'number', value: user?.id},
                {name : 'role', value: UserMapperService.roles[user?.status?? '0']},
            ]
        }    }
}
