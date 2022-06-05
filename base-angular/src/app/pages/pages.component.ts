import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.less']
})
export class PagesComponent implements OnInit {
  handlleApi(){
    this.http.get('http://localhost:3000/api/login').subscribe(res=>{
      console.log('res',res)
    },error=>{
      console.log("error",error)
    })
  }
  constructor(private auth:AuthService,private http:HttpClient) { }
  currentLanguage=''
  ngOnInit(): void {
  }
  logout(){
    console.log('退出登陆')
    this.auth.logout()
  }
}
