import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from '../models/api-models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  private baseUrl = "https://localhost:7137";
  constructor(private httpClient:HttpClient) { }

  getAllClubs():Observable<Club[]>{
    return this.httpClient.get<Club[]>(this.baseUrl + "/clubs");
  }
}
