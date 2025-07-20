import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  template: `
<app-card>
  <h1 class="title-welcome">¡Bienvenido a tu app recetario!</h1>

</app-card>

`,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
