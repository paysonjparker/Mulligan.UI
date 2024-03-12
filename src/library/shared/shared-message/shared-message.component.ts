import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-message.component.html',
  styleUrls: ['./shared-message.component.scss']
})
export class SharedMessageComponent {

}
