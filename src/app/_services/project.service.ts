import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Token, User} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  public getGlobalProject(): Observable<GlobalProject[]>{
    return this.httpClient.get<GlobalProject[]>('http://localhost:8080/projects/global');
  }
  public getLocalProject(): Observable<LocalProject[]>{
    return this.httpClient.get<LocalProject[]>('http://localhost:8080/projects/local');
  }

}

export interface LocalProject {
  title: string;
  totalCost: number;
  deadLine: string;
  id: number;
  zone: string;
  ischecked: boolean;
}

export interface GlobalProject {
  title: string;
  totalCost: number;
  deadLine: string;
  id: number;
  isChecked: boolean;
}
