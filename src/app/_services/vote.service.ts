import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private httpClient: HttpClient) {
  }

  public sendVoteRequest(voteRequest: VoteRequest): void {
    this.httpClient.post('http://localhost:8080/voice/vote', voteRequest).subscribe();
  }
}


export interface VoteRequest {
  idsOfLocalprojects: any[];
  idsOfGlobalprojects: any[];
  token: string;
}
