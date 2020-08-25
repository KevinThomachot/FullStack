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
}
