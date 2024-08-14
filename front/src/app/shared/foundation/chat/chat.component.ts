import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import { ChatObject } from "./chatObject";
import {GlobalService} from "../../global.service";
import { UserRecap } from "../../../http/model/user-model/userObject";
import {MessageModelService} from "../../../http/model/message-model/message-model.service";
import {DateService} from "../../../http/shared/date.service";
import {MessagePostObject} from "../../../http/model/message-model/messageObject";
import moment from "moment";
import {MessageMapperService} from "../../../mapper/message-mapper.service";
import {HttpErrorResponse} from "@angular/common/http";
import {interval, Subscription} from "rxjs";
import {UserMapperService} from "../../../mapper/user-mapper.service";

export type ChatTarget = {subject:'prestation'|'reservation'|'ticket', id:number|bigint}

@Component({
  selector: 'epv-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() set items(items:ChatObject[]){
    this.sortedMessages = items.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  };
  @Input() auto:boolean = true;
  @Input() target ?: ChatTarget;
  free:boolean = true;
  sending_message?:ChatObject;
  currentUser?:UserRecap = GlobalService.currentUser;
  sortedMessages: ChatObject[] = [];
  new_message:string = "";
  periodic?:Subscription;

  constructor(
    private messageService : MessageModelService
  ) {}

  ngOnInit(): void {
    if (this.free){
      this.periodic  = interval(4000).subscribe(() => this.reload())

    }
  }

  ngOnDestroy(): void {
    this.periodic?.unsubscribe()
  }
  getInitials(user?: UserRecap): string {
    return user?.nom?.charAt(0).toUpperCase()?? ' ';
  }

  can_submit():boolean{
    return !!(this.currentUser?.id && this.target && this.free)
  }

  submit_message():void{
    if (this.currentUser?.id && this.target && this.free) {
      const message: MessagePostObject = {
        text: this.new_message,
        date_send: DateService.to_api()
      }
      this.free = false;
      this.sending_message = {
          content: message.text,
          date: moment().toDate(),
          user: this.currentUser
      }

      const error:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
        error.subscribe(()=>{
          this.free = true;
          this.sending_message = undefined;
        }
      )
      this.messageService.post_message(
        message,
        error
        ).subscribe(
        () => {
          this.new_message = '';
          this.free = true;
          this.reload()
        }
      );
    }
  }

  reload():void{
    if (this.auto && this.free && this.target){
      this.sending_message = undefined;

      switch (this.target.subject) {
        case 'prestation':
          this.messageService.get_messages_from_prestation(this.target.id).subscribe((messages)=>
            this.items = messages.map(
              (m)=>
                MessageMapperService.model_to_chat(m))
          );
          break
        case 'ticket':
          this.messageService.get_messages_from_ticket(this.target.id).subscribe((messages)=>
            this.items = messages.map(
              (m)=>
                MessageMapperService.model_to_chat(m))
          );
          break;
        case 'reservation':
          this.messageService.get_messages_from_reservation(this.target.id).subscribe((messages)=>
            this.items = messages.map(
              (m)=>
                MessageMapperService.model_to_chat(m))
          );
          break
      }
    }
  }

  is_current(user ?: UserRecap):boolean{
    return user?.id === this.currentUser?.id
  }

  protected readonly UserMapperService = UserMapperService;
}
