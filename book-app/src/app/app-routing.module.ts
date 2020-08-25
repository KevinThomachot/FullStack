import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenreComponent } from './genre/genre.component';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';
import { GenreAddComponent } from './genre-add/genre-add.component';

const routes: Routes = [
  {path: 'genre', component: GenreComponent},
  {path: 'genre/add', component: GenreAddComponent},
  {path: 'genre/:id', component: GenreDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
