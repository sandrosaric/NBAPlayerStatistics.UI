import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerPostFormModel } from '../models/api-models/player-post-form-model.model';
import {  PlayerPutFormModel } from '../models/api-models/player-put-form-model.model';
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

  getById(playerId:string):Observable<Player>{
    return this.httpClient.get<Player>(this.baseUrl + "/players/" + playerId);
  }

  put(playerId:string,player:Player):Observable<Player>{
    let playerFormModel:PlayerPutFormModel = {
      firstName:player.firstName,
      lastName:player.lastName,
      dateOfBirth:player.dateOfBirth,
      positionId:player.positionId,
      clubId:player.clubId,
      pts:player.pts,
      reb:player.reb,
      ast:player.ast,
      per:player.per
    }
    return this.httpClient.put<Player>(this.baseUrl + "/players/" + playerId,playerFormModel);
  }

  delete(playerId:string):Observable<Player>{
    return this.httpClient.delete<Player>(this.baseUrl + "/players/" + playerId);
  }

  add(player:Player):Observable<Player>{
    let playerPostFormModel:PlayerPostFormModel = {

        firstName:player.firstName,
        lastName:player.lastName,
        dateOfBirth:player.dateOfBirth,
        positionId:player.positionId,
        clubId:player.clubId,
        pts:player.pts,
        reb:player.reb,
        ast:player.ast,
        per:player.per
      }
     return this.httpClient.post<Player>(this.baseUrl+ "/players/add",playerPostFormModel);
    }
  }

