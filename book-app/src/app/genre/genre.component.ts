import { Component, OnInit } from '@angular/core';

import { GenreService } from '../services/genre.service';
import { Genre } from '../genre';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  constructor(private genreService: GenreService) { }

  genres: Genre[]; 

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.genreService.getAll().subscribe(
      data => 
      {
        this.genres = data
        console.log(data);
      }
    )
  }

  delete(genre : Genre){
    //on met à jour la liste des genres en local
    //pour pouvoir remettre le genre à sa place dans le cas d'une erreur, on stocke son index avant de le supprimer de la liste
    const genreIndex = this.genres.findIndex(g => g.id === genre.id);
    //ensuite, on filtre la liste en gardant tous les genre sauf celui supprimé
    this.genres = this.genres.filter( (g) => g.id != genre.id )
    //puis on fait la demande formelle au service
    this.genreService.delete(genre.id).subscribe(
      //si tout va bien on affiche un ptit message TODO: afficher une erreur à l'écran
      () => {console.log("element supprimé")},
      //si une erreur survient on remet le genre à sa place
      err => this.genres.splice(genreIndex, 0, genre) //TODO : aficher une erreur à l'écran
    )
  }
}
