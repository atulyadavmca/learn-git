import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child-selector',
  templateUrl: './child-selector.component.html',
  styleUrls: ['./child-selector.component.css']
})
export class ChildSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() bookTitleCreated = new EventEmitter<{ title: string }>();
  //@Input() bookTitle: string | any;
  
  public bookTitle: string = '';

  onAddTitle() {
   // console.log(value); 
    this.bookTitleCreated.emit({ title: this.bookTitle });
  }


  
}
