import {EventEmitter, Injectable} from '@angular/core';
import {UserObject, UserRecap} from "../http/model/user-model/userObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../shared/foundation/form/form.service";
import {RegexBase} from "../shared/RegexBase";
import {UserModelService} from "../http/model/user-model/user-model.service";

@Injectable({
    providedIn: 'root'
})
export class UserMapperService {
    static rolesList = [
        'voyageur',
        'bailleur',
        'prestataire',
        'admin'
    ]
    static roles : Record<string,string> = {
        '1': UserMapperService.rolesList[0],
        '2': UserMapperService.rolesList[1],
        '3': UserMapperService.rolesList[2],
        '4': UserMapperService.rolesList[3]
    }

    static get_U_Name(user?: { prenom?:string, nom?:string }):string{
        let i:string|undefined = user?.prenom;
        i = i?i[0].toUpperCase():'';
        return i+". " +user?.nom
    }

    static model_to_list(user?:UserObject, detailPage?:string):ListObject{
        return {
            title:UserMapperService.get_U_Name(user),
            link:(detailPage?detailPage+"/":'')+user?.id,
            right:[
                {text : "Mail : "+ user?.mail},
                {text : "Nom : "+ user?.nom },
                {text : "Prenom : "+ user?.prenom }
            ],
            propriete:[
                {name : 'mail' , value: user?.mail},
                {name : 'nom' , value: user?.nom},
                {name : 'prenom' , value: user?.prenom},

                /*

                besoin de rentrer tous les attributs de userObject?

                */
                {name : 'number', value: user?.id},
            ]
        }
    }

    static model_to_rubric(user?:UserObject, title?:string):RubricObject{
        return {
            title: (title?title:'') + UserMapperService.get_U_Name(user),
            content :[
                {name : 'id', type:'text', text:user?.id?.toString()},
                {name : 'prenom', type:'text', text:user?.prenom},
                {name : 'nom', type:'text', text:user?.nom},
                {name : 'mail', type:'text', text:user?.mail},
            ]
        }
    }

    static model_to_form(user?:UserObject, title?:string):FormStepObject[]{
        return [
            {
                title:title,
                errorEvent:new EventEmitter<string>(),
                validator:(step:FormStepObject):EventEmitter<boolean>|boolean=>{
                    const n = FormService.require_values(step.content[0].content, ["prenom", "nom"])
                    if (n){
                        step.errorEvent?.emit("le champ "+n+" doit être remplis");
                        return false;
                    }
                    step.errorEvent?.emit("");
                    return true;
                },
                content :[
                    {
                        title : 'identite',
                        content:[
                            {
                                name:"prenom",
                                title:"prenom *",
                                type : "text",
                                placeholder:"Timéo",
                                default:user?.prenom,
                            },
                            {
                                name:"nom",
                                title:"nom *",
                                type : "text",
                                placeholder:"Dupond",
                                default:user?.nom,
                            },
                            {
                                name:"mail",
                                title:"Email *",
                                type : "email",
                                placeholder:"timeo.dupond@mail.com",
                                default:user?.mail,
                            },
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
                        title:"Coordonnées",
                        content:[
                            {
                                name:"numero",
                                title:"telephone",
                                type: "text",
                                default: user?.num,
                                placeholder: "0786791542",
                                reg_error:[
                                    {regex: RegexBase.tel, message:'le numéro doit être un numéro de telephone valide'}
                                ]
                            }
                        ]
                    },
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
                                default: UserMapperService.roles[user?.status??'1'],
                                choices: UserMapperService.rolesList
                            },
                        ]
                    }
                ]
            }
        ]
    }

    static form_to_model(values:FormFieldObject[]):UserObject{
        const mdp = FormService.get_value(values, "mdp")
        return {
            id: 0, id_address: 0, num: "0123456789",
            prenom: (FormService.get_value(values, "prenom") as string).toUpperCase(),
            nom: (FormService.get_value(values, "nom") as string).toUpperCase(),
            mail: (FormService.get_value(values, "mail") as string).toLowerCase(),
            mdp: mdp?mdp as string:undefined,
            status: (UserMapperService.rolesList.indexOf(FormService.get_value(values, "role") as string)+1).toString().toLowerCase()
        }
    }

}
