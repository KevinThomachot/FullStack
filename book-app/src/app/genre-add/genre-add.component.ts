import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenreService } from '../services/genre.service';
import { Genre } from '../genre';

@Component({
  selector: 'app-genre-add',
  templateUrl: './genre-add.component.html',
  styleUrls: ['./genre-add.component.css']
})
export class GenreAddComponent implements OnInit {

  //FormBuilder est un service permettant la mise en place de formulaires modulables
  constructor(private fb: FormBuilder, private gs: GenreService) { }

  //un FormGroup est un ensemble de FormControl
  //un FormControl est un ensemble de paramètres de contrôles de formulaire visant un champ de formulaire
  createForm: FormGroup;

  ngOnInit(): void {
    //pour créer un formulaire on initialise typiquement un FormGroup
    this.createForm = this.fb.group(
      //dans ce FormGroup il faut ensuite définir chaque FormControl
      {
        //le FormControl le plus simple possible est simplement un nom (ici son nom est 'name')
        //et une valeur de remplissage (ici une chaine vide)
        //mais on peut y rajouter des options (validation par exemple)
        //Validators est un composant des formulaires angular qui permet de mettre en place des contraintes
        //sur un FormControl, ces contraintes sont ensuites validées ou invalidées automatiquement
        //et les caractéristiques et erreurs du formulaires permettent de donner des informations a l'utilisateur
        name: ['', [Validators.required, Validators.maxLength(50)]]
      }
    )
  }

  //pour pouvoir accéder au FormControl name facilement depuis le template
  //on met en place un getter qui renvoie le FormControl directement 
  //cela a l'effet de prodiguer une propriété dynamique ciblant un FormControl en particulier
  get name() { 
    return this.createForm.get('name')
  }

  create(){
    //pour récuperer les valeurs d'un formulaire on peut cibler le FormGroup et récupérer sa value
    //cela renvoie un objet contenant des couples clé:valeur, chaque clé étant un nom de FormControl
    //et chaque valeur étant une valeur de champ de formulaire
    const genre: Genre = this.createForm.value;
    //une fois notre valeur de formulaire récupérée on peut l'envoyer 
    this.gs.create(genre).subscribe(
      response => console.log(response)
    );
  }


}
