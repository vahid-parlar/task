import { Component } from '@angular/core';
import { MaterialModule } from '@modules/Material.module';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '@services/common/local-storage.service';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [RouterLink, MaterialModule],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss',
})
export class MenuHeaderComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  onLogOut() {
    this.localStorageService.removeLoginResult();
    this.router.navigate(['/login']);
  }
}
