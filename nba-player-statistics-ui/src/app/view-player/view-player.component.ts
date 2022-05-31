import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from '../models/ui-models/club.model';
import { Player } from '../models/ui-models/player.model';
import { Position } from '../models/ui-models/position.model';
import { ClubsService } from '../services/clubs.service';
import { PlayersService } from '../services/players.service';
import { PositionsService } from '../services/positions.service';

@Component({
  selector: 'app-view-player',
  templateUrl: './view-player.component.html',
  styleUrls: ['./view-player.component.css']
})
export class ViewPlayerComponent implements OnInit {

playerId:(string | null | undefined);

  player:Player = {
    id: "",
    firstName: "",
    lastName: "",
    positionId: "",
    clubId: "",
    profileImageUrl: "",
    dateOfBirth: "",
    pts: 0,
    reb: 0,
    ast: 0,
    per: 0,
    position:{
      id:"",
      name:""
    },
    club:{
      id:"",
      name:"",
      country:"",
      city:""
    }

  }

  clubs:Club[] = [];
  positions:Position[] = [];



  constructor(private playersService:PlayersService,
    private route:ActivatedRoute,
    private clubsService:ClubsService,
    private positionService:PositionsService,
    private router:Router,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getById();
    this.getClubs();
    this.getPositions();
  }



  private getById(){

    this.route.paramMap.subscribe(
      params =>{
       this.playerId = params.get('playerId');
      }
    );
    if(this.playerId){
      this.playersService.getById(this.playerId).subscribe(
        result =>{
          console.log(result);
          this.player = result;
        },
        error =>{

        }
      );
    }

  }

  private getPositions(){
    this.positionService.getAllPositions().subscribe(
      result =>{
        this.positions = result;
      },
      error => {

      }
    )
  }

  private getClubs(){
    this.clubsService.getAllClubs().subscribe(
      result =>{
        this.clubs = result;
      },
      error => {

      }
    )
  }

  onUpdate(){

      this.playersService.put(this.player.id,this.player).subscribe(
        result => {
          console.log(result);
          this.snackBar.open("Player succesfully updated!",undefined,{duration:2000});
          setTimeout(()=>{
            this.router.navigateByUrl("/players");
          },2000)

        },
        error => {

        }
      )

  }

}
