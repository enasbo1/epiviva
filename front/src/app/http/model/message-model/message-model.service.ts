import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {MessageObject, MessagePostObject, NotifObject} from "./messageObject";
import {RequestService} from "../../shared/request.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MessageModelService extends RequestService{

    get_messages_from_candidate(candidate:number|bigint):Observable<MessageObject[]>{
        return this.get('message/candidate/'+candidate) as Observable<MessageObject[]>
    }

    post_message_for_candidate(message:MessagePostObject, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
        return this.post(message,'message/candidate', errorCatch)
    }

    get_messages_from_benefit(benefit_id:number|bigint):Observable<MessageObject[]>{
        return this.get('message/benefit/'+benefit_id) as Observable<MessageObject[]>
    }

    post_message_for_benefit(message:MessagePostObject, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
        return this.post(message,'message/benefit', errorCatch)
    }

    set_message_read(id:number|bigint):Observable<object>{
        return this.edit({id:id}, 'message/read');
    }

    get_notif():Observable<NotifObject[]> {
        return this.get('message/notif') as Observable<NotifObject[]>

    }
}
