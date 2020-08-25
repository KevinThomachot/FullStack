import { Component, OnInit } from '@angular/core';

import { FormatService } from '../services/format.service';
import { Format } from '../format';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css']
})
export class FormatComponent implements OnInit {

  constructor(private formatService: FormatService) { }

  formats: Format[];

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.formatService.getAll().subscribe(
      data => 
      {
        this.formats = data
        console.log(data);
      }
    )
  }

  delete(format : Format){
    const formatIndex = this.formats.findIndex(f => f.id === format.id);
    this.formats = this.formats.filter( (f) => f.id != format.id )
    this.formatService.delete(format.id).subscribe(() => {console.log("element supprimé")}, 
    err => this.formats.splice(formatIndex, 0, format))
  }
}
