import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import { ChatObject } from "./chatObject";
import {GlobalService} from "../../global.service";
import { UserRecap } from "../../../http/model/user-model/userObject";
import {MessageModelService} from "../../../http/model/message-model/message-model.service";
import {MessageObject, MessagePostObject} from "../../../http/model/message-model/messageObject";
import moment from "moment";
import {MessageMapperService} from "../../../mapper/message-mapper.service";
import {HttpErrorResponse} from "@angular/common/http";
import {interval, Subscription} from "rxjs";
import {UserMapperService} from "../../../mapper/user-mapper.service";
import {RegexBase} from "../../RegexBase";

export type ChatTarget = {subject:'candidate'|'benefit', id:number|bigint}

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
  @Input() set target(target :ChatTarget|undefined){
    this._target = target;
    this.reload()
  }
  get target():ChatTarget|undefined {
    return this._target;
  }

  private _target?:ChatTarget;
  free:boolean = true;
  sending_message?:ChatObject;
  currentUser?:UserRecap = GlobalService.currentUser;
  messages?:MessageObject[];
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
      switch (this.target.subject) {
        case 'candidate':
          message.candidate_id = this.target.id;
          this.messageService.post_message_for_candidate(
              message,
              error
          ).subscribe(
              () => {
                this.new_message = '';
                this.free = true;
                this.reload()
              }
          );
          break
        case 'benefit':
          message.benefit_id = this.target.id;
          this.messageService.post_message_for_benefit(
              message,
              error
          ).subscribe(
              () => {
                this.new_message = '';
                this.free = true;
                this.reload()
              }
          );
          break
      }

    }
  }

  reload():void{
    if (this.auto && this.free && this.target){
      this.sending_message = undefined;

      switch (this.target.subject) {
        case 'candidate':
          this.messageService.get_messages_from_candidate(this.target.id).subscribe((messages)=>
              this.set_messages(messages)
          );
          break
        case 'benefit':
          this.messageService.get_messages_from_benefit(this.target.id).subscribe((messages)=>
            this.set_messages(messages)
          );
          break
      }
    }
  }

  private set_messages(messages:MessageObject[]){
    this.messages = messages
    this.items = messages.map(
        (m)=>
            MessageMapperService.model_to_chat(m)
    )
    this.messages.forEach(
        (message:MessageObject)=>
        {
          if (
              (message.receiver_id===GlobalService.currentUser?.id) &&
              (message.read!='t')
          ){
            this.messageService.set_message_read(message.id).subscribe(()=>undefined)
          }
        }
    )
  }

  is_current(user ?: UserRecap):boolean{
    return user?.id === this.currentUser?.id
  }

  protected readonly UserMapperService = UserMapperService;

  is_system(message: ChatObject) {
    return RegexBase.lang_path.test(message.content);
  }

  is_valid():boolean {
    return /^.{0,255}$/.test(this.new_message);
  }
}
