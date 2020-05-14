import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './shared/list/list.component';
import { BoardComponent } from './shared/board/board.component';
import { BoardService } from './shared/board/board.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
