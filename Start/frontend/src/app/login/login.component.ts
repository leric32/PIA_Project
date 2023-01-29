import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
          localStorage.setItem('ulogovan', JSON.stringify(user));
          if(user.tip.localeCompare("admin")==0) this.router.navigate(["admin"]);
          else{
            if(user.tip.localeCompare("organizator")==0) this.router.navigate(["organizator"]);
            else this.router.navigate(["ucesnik"]);
          } 
      }
      else this.error = "Greska pri logovanju!!!";
    })
  }

 

  func(){
    this.userService.mail("s", "s").subscribe()
  }

}
