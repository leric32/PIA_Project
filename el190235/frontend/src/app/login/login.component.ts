import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from '../models/like';
import { User } from '../models/user';
import { WorkShop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,  private router:Router, private workshopService: WorkshopService) { 
  }

  ngOnInit(): void {
    localStorage.removeItem('ulogovan');

    this.rad = true;
    this.logP = false;

    this.mestoPret = "";
    this.nazivPret = "";

    this.workshopService.getActiveWorkshops().subscribe((w: WorkShop[]) => {
      this.mojeRU = w;
      this.mojeR = w;
      //console.log(this.mojeR3)
    })

    this.workshopService.getAll().subscribe((w: WorkShop[])=>{
      this.top5 = w;
      
      this.top5.forEach(r =>{
        this.workshopService.getLikesForWorkshop(r.naziv).subscribe((ln: Like[])=>{
          r.brojLajkova = ln.length;
        })
      })
      
      setTimeout(()=>{
        this.sortTop();
      }, 300)
    })

  }

  username: string;
  password: string;
  error: string;

  mojeRU: WorkShop[];
  mojeR: WorkShop[];
  top5: WorkShop[];
  rad: boolean;
  logP: boolean;

  sorting: string;
  mestoPret: string;
  nazivPret: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
          localStorage.setItem('ulogovan', JSON.stringify(user));
          if(user.tip.localeCompare("admin")==0) {
            this.error = "Admin nema pravo logovanjovanja na ovoj formi!!!";
          }
          else{
            if(user.tip.localeCompare("organizator")==0) this.router.navigate(["organizator"]);
            else this.router.navigate(["ucesnik"]);
          } 
      }
      else this.error = "Greska pri logovanju!!!";
    })
  }

 
  izabrao(br){
    if(br == 1){
      this.rad = true;
    this.logP = false;
    }else if (br == 2){
      this.rad = false;
      this.logP = true;
    }
  }

  pretrazi(){
    this.mojeR = this.mojeRU.filter(r =>{
      return r.naziv.includes(this.nazivPret) && r.mesto.includes(this.mestoPret);
    })
  }

  

  sort(){
    switch (this.sorting) {
      case 'naziv':
        this.mojeR.sort((a, b) => a.naziv.localeCompare(b.naziv));
        break;
      case 'datum':
        this.mojeR.sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
        break;
    }
  }

  sortTop(){
    console.log(this.top5)
    this.top5 = this.top5.sort((a, b) => b.brojLajkova - a.brojLajkova);
    this.top5 = this.top5.slice(0, 5);
    console.log(this.top5)
  }

}
