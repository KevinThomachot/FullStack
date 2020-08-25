import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenreComponent } from './genre/genre.component'; 
import { HttpClientModule } from '@angular/common/http';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GenreAddComponent } from './genre-add/genre-add.component';

@NgModule({
  declarations: [
    AppComponent,
    GenreComponent,
    GenreDetailComponent,
    GenreAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
