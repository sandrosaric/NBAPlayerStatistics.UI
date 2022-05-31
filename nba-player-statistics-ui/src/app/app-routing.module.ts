import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { ViewPlayerComponent } from './view-player/view-player.component';

const routes: Routes = [{
  path:"",
  component:PlayersComponent
},
{
  path:"players",
  component:PlayersComponent
},
{
  path:"players/:playerId",
  component:ViewPlayerComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
