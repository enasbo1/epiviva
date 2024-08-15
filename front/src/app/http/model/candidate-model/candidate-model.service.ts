import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {CandidateObject, CandidatePostObject} from "./candidateObject";

@Injectable({
  providedIn: 'root'
})
export class CandidateModelService extends RequestService {

  edit_userCandidate(content: CandidateObject, errorEvent?: EventEmitter<HttpErrorResponse>): Observable<object> {
    return (this.post(content, 'candidate/user'));
  }

  post_candidate(content: CandidatePostObject, errorEvent?: EventEmitter<HttpErrorResponse>): Observable<object> {
    return (this.post(content, 'candidate', errorEvent));
  }

  post_self_candidate(content: CandidatePostObject, errorEvent?: EventEmitter<HttpErrorResponse>): Observable<object> {
    return (this.post(content, 'candidate/self', errorEvent));
  }

  get_candidate(): Observable<CandidateObject[]> {
    return (this.get('candidate') as Observable<CandidateObject[]>);
  }

  get_one_candidate(number: bigint): Observable<CandidateObject[]> {
    return (this.get_one('candidate', number) as Observable<CandidateObject[]>);

  }

  update_candidate(content: CandidateObject): Observable<object> {
    return (this.edit(content, 'candidate'))
  }

  delete_candidate(id: bigint): Observable<object> {
    return (this.delete('candidate', id))
  }

  get_self_candidate(): Observable<CandidateObject[]>{
    return (this.get('candidate/self') as Observable<CandidateObject[]>);
  }
}