import { Club } from "./club.model";
import { Position } from "./position.model";

export interface Player{
    id:string;
    firstName:string;
    lastName:string;
    positionId:string;
    clubId:string;
    profileImageUrl?:string;
    dateOfBirth:string;
    pts:number;
    reb:number;
    ast:number;
    per:number;
    position:Position;
    club:Club;

}
