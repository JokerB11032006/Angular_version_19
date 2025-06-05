import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  // User data
  userData = {
    name: 'Krishna Kumar',
    empId: 'S00123',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  constructor() { }

  ngOnInit(): void { }

  onLogout(): void {
    // Add logout logic here
    console.log('Logout clicked');
  }
} 