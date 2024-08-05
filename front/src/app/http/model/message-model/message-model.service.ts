import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {MessageObject, MessagePostObject} from "./messageObject";
import {RequestService} from "../../shared/request.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MessageModelService extends RequestService{

    get_messages_from_prestation(prestation:number|bigint):Observable<MessageObject[]>{
        return this.get('message/service_used/'+prestation) as Observable<MessageObject[]>
    }
    get_messages_from_reservation(reservation:number|bigint):Observable<MessageObject[]>{
        return this.get('message/reservation/'+reservation) as Observable<MessageObject[]>
    }

    get_messages_from_ticket(ticket:number|bigint):Observable<MessageObject[]>{
        return this.get('message/ticket/'+ticket) as Observable<MessageObject[]>
    }

    post_message(message:MessagePostObject, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
        return this.post(message,'message', errorCatch)
    }
}
