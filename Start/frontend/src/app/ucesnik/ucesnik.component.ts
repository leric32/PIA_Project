import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { User } from '../models/user';
import { WorkShop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-ucesnik',
  templateUrl: './ucesnik.component.html',
  styleUrls: ['./ucesnik.component.css']
})
export class UcesnikComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));

    this.prof = false;
    this.org = false;

    if (JSON.parse(localStorage.getItem('azurK')) != null) {
      this.azurK = JSON.parse(localStorage.getItem('azurK'))
    } else {
      this.azurK = null;
    }
    this.ime = null;
    this.prezime = null;
    this.korisnicko_ime = null;
    this.lozinka = null;
    this.email = null;
    this.tip = null;
    this.tel = null;
    this.slika = null;

    this.workshopService.getAllForUser(this.ulogovan.korisnicko_ime).subscribe((w: WorkShop[])=>{
      this.mojeR = w;
    })

  }

  ulogovan: User;
  prof: boolean;
  org: boolean;
  azurK: User;

  ime: string;
  prezime: string;
  korisnicko_ime: string;
  lozinka: string;
  email: string;
  tip: string;
  tel: string;
  slika: string;

  mojeR: WorkShop[];

  izabrao(br) {
    if (br == 1) {
      this.prof = true;
    } else if (br == 2) {
      this.prof = false;
    } else if (br == 3) {
      this.prof = false;
    }

  }

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
      this.slika = d;
    })

  }

  hi(){
    this.workshopService.hi().subscribe(()=>{

    })
  }

  azuriraj() {

    if (JSON.parse(localStorage.getItem('azurK')) == null) {
      localStorage.setItem('azurK', JSON.stringify(this.ulogovan));
      this.azurK = this.ulogovan;
      this.router.navigate(["ucesnik"]);
    } else {

      let rki = this.azurK.korisnicko_ime;

      this.userService.update(this.ime == null ? this.azurK.ime : this.ime,
        this.prezime == null ? this.azurK.prezime : this.prezime,
        this.korisnicko_ime == null ? this.azurK.korisnicko_ime : this.korisnicko_ime,
        this.tip == null ? this.azurK.tip : this.tip,
        this.lozinka == null ? this.azurK.lozinka : this.lozinka,
        this.tel == null ? this.azurK.tel : this.tel,
        this.email == null ? this.azurK.email : this.email,
        null, null, null, rki, this.slika == null ? this.azurK.slika : this.slika).subscribe((resp) => {
          if (resp['msg'] == "OK") {
            alert("Azuriran korisnik");
          } else if (resp['msg'] == "ki") {
            alert("Nije azuriran, jer vec postoji korisnik sa datim korisnickim imenom!!!");
          } else if (resp['msg'] == "em") {
            alert("Nije azuriran, jer vec postoji korisnik sa datim mail-om!!!");
          } else {
            alert("Nije azuriran korisnik!!!");
          }
          //this.azurK = null;
          localStorage.setItem('azurK', null);
          // this.ime = null;
          // this.prezime = null;
          // this.korisnicko_ime = null;
          // this.lozinka = null;
          // this.email = null;
          // this.tip = null;
          // this.tel = null;
          // this.slika = null;
          this.userService.login(this.korisnicko_ime == null ? this.azurK.korisnicko_ime : this.korisnicko_ime,
            this.lozinka == null ? this.azurK.lozinka : this.lozinka).subscribe((user: User) => {
            if (user) {
              console.log("usao")
              localStorage.setItem('ulogovan', JSON.stringify(user));
              this.ulogovan = user;
              this.azurK = null;
              this.router.navigate(["ucesnik"]);
            }

          })
        })

    }

  }
}
