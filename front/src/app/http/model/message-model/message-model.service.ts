import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {MessageObject, MessagePostObject} from "./messageObject";
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
}
