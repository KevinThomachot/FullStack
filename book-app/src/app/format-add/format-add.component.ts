import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormatService } from '../services/format.service';
import { Format } from '../format';

@Component({
  selector: 'app-format-add',
  templateUrl: './format-add.component.html',
  styleUrls: ['./format-add.component.css']
})
export class FormatAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private fs: FormatService) { }

  createForm: FormGroup;

  ngOnInit(): void {

    this.createForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(50)]],
        height: ['', [Validators.required, Validators.maxLength(5)]],
        wight: ['', [Validators.required, Validators.maxLength(5)]],
        landscape: ['']
      }
    )
  }

  get name() { 
    return this.createForm.get('name')
  }

  get height() { 
    return this.createForm.get('height')
  }

  get width() { 
    return this.createForm.get('width')
  }

  get landscape() { 
    return this.createForm.get('landscape')
  }

  create(){
 
    const format: Format = this.createForm.value;
    this.fs.create(format).subscribe(
      response => console.log(response)
    );
  }


}
