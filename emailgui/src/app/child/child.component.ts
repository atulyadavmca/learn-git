import { Component,OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor(){}

  @Input() firstName:any;
  @Input() lastName:any;
  @Input() siblings: [] | any;
  
  ngOnInit(): void {
    
  }

}
