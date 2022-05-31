import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/api-models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  private baseUrl = "https://localhost:7137";
  constructor(private httpClient:HttpClient) { }

  getAllPositions():Observable<Position[]>{
    return this.httpClient.get<Position[]>(this.baseUrl + "/positions");
  }
}
