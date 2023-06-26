import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emailgui';

  firstName: any;
  lastName: any;
  siblings: Array<string> | any;

ngOnInit(): void{
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.siblings = new Array<string>('Jane', 'Jack', 'Sophie');
}


}

