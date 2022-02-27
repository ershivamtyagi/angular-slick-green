import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExcersizeListResponse } from '../common/excersize-list-response';
import {BASE_URL} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ExcersizeService {

  constructor(private httpClient: HttpClient){ }
  private baseUrl1 =BASE_URL+'/excersizes';
  getAllExcersizes() : Observable<GetResponseExcersizes>{
    console.log("At service"+this.baseUrl1)
     return this.httpClient.get<GetResponseExcersizes>(`${this.baseUrl1}`);
  }
}
interface GetResponseExcersizes{
  _embedded: {
    excersizes: ExcersizeListResponse[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
