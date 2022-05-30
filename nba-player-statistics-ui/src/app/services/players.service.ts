import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/api-models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private baseUrl = "https://localhost:7137";
  constructor(private httpClient : HttpClient) { }

  getAll():Observable<Player[]>{
    return this.httpClient.get<Player[]>(this.baseUrl + "/" + "players");
  }
}
