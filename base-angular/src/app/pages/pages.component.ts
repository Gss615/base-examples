import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.less']
})
export class PagesComponent implements OnInit {

  constructor(private auth:AuthService) { }
  currentLanguage=''
  ngOnInit(): void {
  }
  logout(){
    console.log('退出登陆')
    this.auth.logout()
  }
}
