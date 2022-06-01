import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  favoriteControl = new FormControl('init')
  favoriteModel = ''
  formgroups: any
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  form = this.fb.group({
    fbFirst:['1'],
    aliases:this.fb.array([
      this.fb.control('')
    ])
  })
  get aliases(){
    return this.form.get('aliases') as FormArray
  }
  addAlias(){
    this.aliases.push(this.fb.control(''))
  }
  ngOnInit(): void {
    this.formgroups = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });
  }
  handleHttp() {
    console.log('这里有 请求')
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(res => {
      console.log('------', res)
    })
  }
  handleClick() {
    this.favoriteControl.setValue('hh')
    console.log('查看表单', this.favoriteControl.value, this.formgroups.value)
  }

}
