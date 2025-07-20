import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './app-layout.componet.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  sidebarOpen = window.innerWidth > 768;

  private resizeObserver: (() => void) | null = null;

  ngOnInit() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    this.sidebarOpen = !isMobile;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  maybeClose() {
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }
}
