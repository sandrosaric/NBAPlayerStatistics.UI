import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from '../models/ui-models/player.model';



import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players:Player[] = [];
  displayedColumns:string[] = ["firstName","lastName","club","position","dateOfBirth","pts","reb","ast","per","edit"];
  dataSource:MatTableDataSource<Player> = new MatTableDataSource<Player>();
  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort;
  filterString:string = "";

  constructor(private playersService:PlayersService) { }

  ngOnInit(): void {
    this.getAllPlayers();
  }


  filterPlayers(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

  private getAllPlayers(){
    this.playersService.getAll().subscribe(
      result =>{
        this.players = result;
        this.dataSource = new MatTableDataSource<Player>(this.players);

        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }
        if(this.matSort){
          this.dataSource.sort = this.matSort;
        }
      },
      error =>{

      }

    )
  }

}
