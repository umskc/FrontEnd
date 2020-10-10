import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../_services/token.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.tokenService.signOut();
    this.router.navigateByUrl('/admin/login');
  }
}
