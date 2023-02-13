import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
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
    this.error = null;
    this.slika = null;
  }

  ulogovan: User;
  korisnici: User[];
  kor: boolean;
  rad: boolean;
  dod: boolean;
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
  slika: string;

  izabrao(br) {
    if (br == 1) {
      this.rad = false;
      this.kor = true;
      this.dod = false;
      console.log(this.azurK)
      this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
        this.korisnici = u;
      });
    } else if (br == 2) {
      this.kor = false;
      this.rad = true;
      this.dod = false;
    } else if (br == 3) {
      this.rad = false;
      this.kor = false;
      this.dod = true;
    }
  }
  kor_ime: string;
  lozinka2: string;
  org: boolean;
  naz_org: string;
  adr_org: string;
  error: string;
  image: string;

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
        o, a, b, rki, this.slika == null ? this.azurK.slika : this.slika).subscribe((resp) => {
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

  prihvati(k) {
    this.userService.approve(k.korisnicko_ime).subscribe((ok) => {
      this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
        this.korisnici = u;
      });
    })

  }

  odbij(k) {
    this.userService.decline(k.korisnicko_ime).subscribe((ok) => {
      this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
        this.korisnici = u;
      });
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
  }

  load($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    console.log(file)

    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      console.log(d)
      if(this.kor == true){
        this.slika = d;
      }else{
        this.image = d;
      }
    })

  }

  register() {

    let tip = (this.org == true) ? "organizator" : "ucesnik";

    if (this.lozinka == this.lozinka2) {
      this.error = null;
      if (/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,16}$/.test(this.lozinka) && this.lozinka.charAt(0).toLowerCase() != this.lozinka.charAt(0).toUpperCase()) {
        console.log(1)
        this.userService.register(this.ime, this.prezime, this.kor_ime, tip, this.lozinka, this.tel, this.email, this.naz_org, this.adr_org, this.broj_org, "aktivan", this.image).subscribe((resp) => {
          if (resp['msg'] == "OK") {
            alert("Dodat korisnik");
          } else if (resp['msg'] == "ki") {
            alert("Nije dodat, jer vec postoji korisnik sa datim korisnickim imenom!!!");
          } else if (resp['msg'] == "em") {
            alert("Nije dodat, jer vec postoji korisnik sa datim mail-om!!!");
          } else {
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
