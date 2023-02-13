import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private userService:UserService,  private router:Router) { 
  }

  ngOnInit(): void {
    localStorage.removeItem('ulogovan')
  }

  username: string;
  password: string;
  error: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
          if(user.tip.localeCompare("admin")==0) {
            localStorage.setItem('ulogovan', JSON.stringify(user));
            this.router.navigate(["admin"]);
          }
          else{
            this.error = "Greska pri logovanju!!!";
          } 
      }
      else this.error = "Greska pri logovanju!!!";
    })
  }

}
