import { Component, OnInit } from '@angular/core';
import { GenreService } from '../services/genre.service';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../genre';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.css']
})
export class GenreDetailComponent implements OnInit {

  constructor(private genreService: GenreService, private route: ActivatedRoute, private fb: FormBuilder) { }

  genre: Genre; 
  formEdit: FormGroup;

  ngOnInit(): void {
    //récupération du paramètre id et conversion en type number
    let id = +this.route.snapshot.paramMap.get('id');
    this.genreService.get(id).subscribe(
      data => {
        this.genre = data;
      }
    )
  }
  
  //renvoie un formGroup approprié pour l'édition d'un genre
  initForm(): FormGroup{
    return this.fb.group(
      {
        name: [this.genre.name]
      }
    )
  }

  edit(): void {
    const genreUpdate:Genre = this.formEdit.value; 
    genreUpdate.id = this.genre.id;
    this.genreService.update(genreUpdate).subscribe(data => {
      //on met a jour la donnée locale avec le genre modifié reçu depuis l'api
      this.genre = data;
      //puis on desactive le mode edition
      this.toggleEdit();
    })
  }

  //editing sert à savoir si on est en mode édition ou pas
  editMode: boolean = false;
  //cette fonction active ou desactive le mode edition selon s'il est déjà activé ou désactivé
  toggleEdit(){
    //on inverse le mode d'edition
    this.editMode = !this.editMode; 
    if (this.editMode){
      //on range un formGroup fraichement initialisé dans formEdit
      this.formEdit = this.initForm();
    } else {
      //a la desactivation du mode edition on supprime l'instance de formGroup de notre formulaire
      this.formEdit = null;
    }
  }
}
