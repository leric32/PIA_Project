import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Like } from '../models/like';
import { Comment } from '../models/comment';
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
    this.radPage = false;


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
    this.sorting = null;
    this.lik = false;
    this.updCom = "";
    this.promenaKom = null;

    this.workshopService.getAllForUser(this.ulogovan.korisnicko_ime).subscribe((w: WorkShop[])=>{
      this.mojeR = w;
    })

    this.workshopService.getAllForUser3(this.ulogovan.korisnicko_ime).subscribe((w: WorkShop[])=>{
      this.mojeR3 = w;
      console.log(this.mojeR3)
    })

    this.workshopService.getAllForUser2(this.ulogovan.korisnicko_ime).subscribe((w: WorkShop[])=>{
      this.mojeR2 = w;

      this.mojeR2.forEach(r =>{
        let t1 = new Date(r.datum);
        let t2 = new Date();

        let date_diff_in_seconds = Math.abs((t1.getTime() - t2.getTime()) / 1000);

        //console.log(date_diff_in_seconds);

        if (date_diff_in_seconds < 12*60*60) {
          r.blizu = false
        }else{
          r.blizu = true;
        }
      })

    })

    this.workshopService.getLikes(this.ulogovan.korisnicko_ime).subscribe((l: Like[])=>{
      this.likes = l;
    })

    this.workshopService.getComments(this.ulogovan.korisnicko_ime).subscribe((c: Comment[])=>{
      this.comms = c;
    })
  }

  ulogovan: User;
  prof: boolean;
  org: boolean;
  radPage: boolean;
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
  mojeR2: WorkShop[];
  mojeR3: WorkShop[];
  sorting: String;
  lik: boolean;

  likes: Like[];
  comms: Comment[];
  updCom: string;
  promenaKom: Comment;

  izabrao(br) {
    if (br == 1) {
      //profile + radionice
      this.prof = true;
      this.lik = false;
    } else if (br == 2) {
      //profile + likes
      this.prof = true;
      this.lik = true;
    } else if (br == 3) {
      //radionice
      this.prof = false;
      this.lik = false;
      this.radPage = true;
    }else if (br == 4){
      this.prof = false;
      this.lik = false;
      this.radPage = false;
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

  sort(){
    console.log(this.sorting)

    switch(this.sorting){
      case 'naziv':
        this.mojeR.sort((a, b) => a.naziv.localeCompare(b.naziv));
        break;
      case 'organizator':
        this.mojeR.sort((a, b) => a.organizator.localeCompare(b.organizator));
        break;
      case 'ko':
        this.mojeR.sort((a, b) => a.kratak_opis.localeCompare(b.kratak_opis));
        break;
      case 'mesta':
        this.mojeR.sort((a, b) => a.mesta - b.mesta);
        break;
      case 'datum':
        this.mojeR.sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
        break;
    }
  }


  izbrisiLajk(l: Like){
    this.workshopService.deleteLike(l.ucesnik, l.radionica).subscribe((resp)=>{
      if(resp['msg'] == "OK"){
        alert("Lajk uspesno izbrisan");
        this.workshopService.getLikes(this.ulogovan.korisnicko_ime).subscribe((l: Like[])=>{
          this.likes = l;
        })
      }
    })
  }

  promeniKom(l){
    
    if(this.promenaKom == null){
      this.promenaKom = l;
      this.router.navigate(["ucesnik"]);
    }else{
      this.workshopService.updateComment(l.ucesnik, l.radionica, this.updCom).subscribe((resp)=>{
        if(resp['msg'] == "OK"){
          alert("Komentar uspesno azuriran");
          this.workshopService.getComments(this.ulogovan.korisnicko_ime).subscribe((c: Comment[])=>{
            this.comms = c;
            this.promenaKom = null;
            this.router.navigate(["ucesnik"]);
          })
        }
      })
    }

  }

  izbrisiKom(l){
    this.workshopService.deleteComment(l.ucesnik, l.radionica).subscribe((resp)=>{
      if(resp['msg'] == "OK"){
        alert("Komentar uspesno izbrisan");
        this.workshopService.getComments(this.ulogovan.korisnicko_ime).subscribe((c: Comment[])=>{
          this.comms = c;
        })
      }
    })
  }

  otkazi(r: WorkShop){
    this.workshopService.povuciPrijavu(r.naziv, this.ulogovan.korisnicko_ime).subscribe((resp)=>{
      if(resp['msg'] == "OK"){
        alert("Uspesno ste povukli prijavu");
        this.workshopService.getAllForUser2(this.ulogovan.korisnicko_ime).subscribe((w: WorkShop[])=>{
          this.mojeR2 = w;
    
          this.mojeR2.forEach(r =>{
            let t1 = new Date(r.datum);
            let t2 = new Date();
    
            console.log(t1)
            let date_diff_in_seconds = Math.abs((t1.getTime() - t2.getTime()) / 1000);
    
            console.log(date_diff_in_seconds);
    
            if (date_diff_in_seconds < 12*60*60) {
              r.blizu = false
            }else{
              r.blizu = true;
            }
          })
    
        })
      }
    })
  }

  detalji(r: WorkShop){
    localStorage.setItem('radionica-detalji', JSON.stringify(r));
    this.router.navigate(["workshop_details"]);
  }
}
