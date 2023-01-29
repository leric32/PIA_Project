import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));
    this.kor = false;
    this.rad = false;
    if (JSON.parse(localStorage.getItem('azurK')) != null) {
      this.azurK = JSON.parse(localStorage.getItem('azurK'))
    } else {
      this.azurK = null;
    }

    console.log(this.azurK)
    this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
      this.korisnici = u;
    });
    this.ime = null;
    this.prezime = null;
    this.korisnicko_ime = null;
    this.lozinka = null;
    this.email = null;
    this.tip = null;
    this.tel = null;
    this.organizacija = null;
    this.adresa_org = null;
    this.broj_org = null;
  }

  ulogovan: User;
  korisnici: User[];
  kor: boolean;
  rad: boolean;
  azurK: User;

  ime: string;
  prezime: string;
  korisnicko_ime: string;
  lozinka: string;
  email: string;
  tip: string;
  tel: string;
  organizacija: string;
  adresa_org: string;
  broj_org: number;

  izabrao(br) {
    if(br == 1){
      this.rad = false;
      this.kor = true;
    }else if(br == 2){
      this.kor = false;
      this.rad = true;
    }
  }

  obrisi(k) {

    this.userService.delete(k.korisnicko_ime).subscribe((ok) => {
      this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
        this.korisnici = u;
        console.log(this.korisnici)
      });
    })
  }

  azuriraj(k) {

    if (JSON.parse(localStorage.getItem('azurK')) == null) {
      console.log("usao")
      localStorage.setItem('azurK', JSON.stringify(k));
      this.azurK = k;
      this.router.navigate(["admin"]);
    } else {

      let o, a, b;

      if (this.tip == 'ucesnik' || this.azurK.tip == 'ucesnik') {
        o = null;
        a = null;
        b = null;
      } else {
        o = this.organizacija == null ? this.azurK.organizacija : this.organizacija;
        a = this.adresa_org == null ? this.azurK.adresa_org : this.adresa_org;
        b = this.broj_org == null ? this.azurK.broj_org : this.broj_org;
      }

      let rki = this.azurK.korisnicko_ime;

      this.userService.update(this.ime == null ? this.azurK.ime : this.ime,
        this.prezime == null ? this.azurK.prezime : this.prezime,
        this.korisnicko_ime == null ? this.azurK.korisnicko_ime : this.korisnicko_ime,
        this.tip == null ? this.azurK.tip : this.tip,
        this.lozinka == null ? this.azurK.lozinka : this.lozinka,
        this.tel == null ? this.azurK.tel : this.tel,
        this.email == null ? this.azurK.email : this.email,
        o, a, b, rki).subscribe((resp) => {
          if (resp['msg'] == "OK") {
            alert("Azuriran korisnik");
          } else if (resp['msg'] == "ki") {
            alert("Nije azuriran, jer vec postoji korisnik sa datim korisnickim imenom!!!");
          } else if (resp['msg'] == "em") {
            alert("Nije azuriran, jer vec postoji korisnik sa datim mail-om!!!");
          } else {
            alert("Nije azuriran korisnik!!!");
          }
          this.azurK = null;
          localStorage.setItem('azurK', null);
          this.ime = null;
          this.prezime = null;
          this.korisnicko_ime = null;
          this.lozinka = null;
          this.email = null;
          this.tip = null;
          this.tel = null;
          this.organizacija = null;
          this.adresa_org = null;
          this.broj_org = null;
          this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
            this.korisnici = u;
          });
          this.router.navigate(["admin"]);
        })
    }

  }

  prihvati(k){
    this.userService.approve(k.korisnicko_ime).subscribe((ok)=>{
      this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
        this.korisnici = u;
      });
    })

  }

  odbij(k){
    this.userService.decline(k.korisnicko_ime).subscribe((ok)=>{
      this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
        this.korisnici = u;
      });
    })
  }

}
