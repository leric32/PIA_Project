import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registartion',
  templateUrl: './registartion.component.html',
  styleUrls: ['./registartion.component.css']
})
export class RegistartionComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  ime: string;
  prezime: string;
  kor_ime: string;
  lozinka: string;
  lozinka2: string;
  email: string;
  tel: string;
  org: boolean;
  naz_org: string;
  adr_org: string;
  broj_org: number;
  error: string;
  image: string;

  readFile(file: File, subscriber: Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
  }

  load($event: Event){
    const file = ($event.target as HTMLInputElement).files[0];
    console.log(file)
    
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      console.log(d)
      this.image = d;
    })

  }

  register() {

    let tip = (this.org == true) ? "organizator" : "ucesnik";

    if (this.lozinka == this.lozinka2) {
      this.error = "";
      if (/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,16}$/.test(this.lozinka) && this.lozinka.charAt(0).toLowerCase() != this.lozinka.charAt(0).toUpperCase()) {
        console.log(1)
        this.userService.register(this.ime, this.prezime, this.kor_ime, tip, this.lozinka, this.tel, this.email, this.naz_org, this.adr_org, this.broj_org, "pending", this.image).subscribe((resp)=>{
          if(resp['msg'] == "OK"){
            alert("Dodat korisnik");
          }else if(resp['msg'] == "ki"){
            alert("Nije dodat, jer vec postoji korisnik sa datim korisnickim imenom!!!");
          }else if(resp['msg'] == "em"){
            alert("Nije dodat, jer vec postoji korisnik sa datim mail-om!!!");
          }else{
            alert("Nije dodat korisnik!!!");
          }
        })
      } else {
        this.error = "Lozinka ne zadovoljava uslove da ime bar jedno veliko slovo, jedan broj, jedan specijalan znak, pocinje slovom i duzine od 8 do 16 karaktera!!!";
      }
    } else {
      this.error = "Pogresno ste ponovili lozinku!!!"
    }
  }
}
