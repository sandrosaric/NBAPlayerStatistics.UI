import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  isNewPlayer = false;
  header = "";
  displayProfileImageUrl = "";


  @ViewChild("playerForm") playerForm?:NgForm


  constructor(private playersService:PlayersService,
    private route:ActivatedRoute,
    private clubsService:ClubsService,
    private positionService:PositionsService,
    private router:Router,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.CreateOrUpdate();
    this.getClubs();
    this.getPositions();
  }




  private CreateOrUpdate(){

    this.route.paramMap.subscribe(
      params =>{
       this.playerId = params.get('playerId');
      }
    );
    if(this.playerId){
      if(this.playerId.toLowerCase() == "Add".toLowerCase()){
        this.isNewPlayer = true;
        this.header = "Add new player";
        this.setImage();
      }
      else{
        this.isNewPlayer = false;
        this.header = "Edit a player";
        this.playersService.getById(this.playerId).subscribe(
          result =>{
            this.player = result;
            console.log(this.player);
            this.setImage();
          },
          error =>{

          }
        );
      }


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
    if(this.playerForm?.valid){
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

  onDelete(){
    this.playersService.delete(this.player.id).subscribe(
      result =>{
        this.snackBar.open("Player successfully deleted!",undefined,{duration:2000});
        setTimeout(()=>{
          this.router.navigateByUrl("/players");
        },2000)
      },
      error => {

      }
    )
  }

  onAdd(){
    if(this.playerForm?.valid){
      if(this.player){
        this.playersService.add(this.player).subscribe(
          result => {
            this.snackBar.open("Player successfully added!",undefined,{duration:2000});
            setTimeout(()=>{
              this.router.navigateByUrl("/players");
            },2000)
          },
          error => {

          }
        );
      }
    }

  }

  private setImage(){
    if(this.player.profileImageUrl){
      this.displayProfileImageUrl = this.playersService.getImagePath(this.player.profileImageUrl);
    }
    else{
      this.displayProfileImageUrl = "assets/user.png";
    }
  }


  uploadImage(event:any){
    if(this.playerId){
      const file:File = event.target.files[0];
      this.playersService.uploadImage(this.playerId,file).subscribe(
        result =>{
          this.player.profileImageUrl = result;
          console.log(this.player.profileImageUrl);
          this.setImage();
          this.snackBar.open("Image uploaded successfully!",undefined,{
            duration:2000
          })
        },
        error => {

        }
      )
    }
  }

}
