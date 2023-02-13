import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { User } from '../models/user';
import { WorkShop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));

    this.rad = false;
    this.sveR = false;

    this.workshopService.getAll().subscribe((w: WorkShop[]) => {
      this.radionice = w;
      //console.log(this.radionice)
    })

    if (JSON.parse(localStorage.getItem('azurR')) != null) {
      this.azurR = JSON.parse(localStorage.getItem('azurR'))
    } else {
      this.azurR = null;
    }
  }

  ulogovan: User;
  rad: boolean;
  sveR: boolean;

  naziv: string;
  datum: Date;
  mesto: string;
  organizator: string;
  kratak_opis: string;
  duzi_opis: string;
  mesta: number;
  zauzeto: number;
  slika: string;
  status: string;

  radionice: WorkShop[];
  azurR: WorkShop;

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
      this.slika = d;
    })

  }

  izabrao(br) {
    if (br == 1) {
      this.rad = false;
      this.sveR = true;
    } else if (br == 2) {
      this.rad = true;
      this.sveR = false;
    }

  }

  insert() {
    this.workshopService.insert(this.naziv, this.ulogovan.korisnicko_ime, this.mesto, this.kratak_opis, this.duzi_opis, this.datum, this.mesta, this.slika).subscribe((resp) => {
      if (resp['msg'] == "OK") {
        alert("Radionica kreirana!!!")
      } else {
        alert("Radionica nije kreirana!!!")
      }
    })
  }

  azuriraj(r) {

    if (JSON.parse(localStorage.getItem('azurR')) == null) {
      localStorage.setItem('azurR', JSON.stringify(r));
      this.azurR = r;
      this.router.navigate(["organizator"]);
    } else {
      this.azurR = null;
      localStorage.setItem('azurR', null);
      this.router.navigate(["organizator"]);

    }

  }

  prihvati(r){

  }

  otkazi(r: WorkShop){

    let uces = r.prihvaceni;

    this.workshopService.deleteAllCommentsAndLikes(r.naziv).subscribe((resp)=>{
      if(resp['msg'] == "OK"){
        alert("Uspesno ste otkazali radionicu - " + r.naziv);

        if(uces != null){
            uces.forEach(u => {
            
            this.userService.getOneByName(u).subscribe((user: User) =>{
              this.userService.sendCancelationEmail(r.naziv, user.email).subscribe(()=>{
                //posalo email
              })
            })
          
          })
        }
        this.workshopService.getAll().subscribe((w: WorkShop[]) => {
          this.radionice = w;
          console.log(this.radionice)
        })
       
      }
    })

  }

  sacuvaj(r){

    const js = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(r)
    )}`;

    const link = document.createElement("a");

    link.href = js;

    link.download = "radionica.json";

    link.click()

  }

}
