import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ReactiveFormsModule],
})
export class AppComponent {
  title = 'SoftParking-Final';
}
