import { Component } from '@angular/core';
import { MaterialModule } from '@modules/Material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [RouterLink, MaterialModule],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss'
})
export class MenuHeaderComponent {

}
