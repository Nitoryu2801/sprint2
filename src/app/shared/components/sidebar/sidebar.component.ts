import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router) {}

  confirmLogout(): void {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas cerrar sesión?');

    if (isConfirmed) {
      localStorage.removeItem('auth_token');
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
