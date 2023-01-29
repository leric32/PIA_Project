import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registartion-admin',
  templateUrl: './registartion-admin.component.html',
  styleUrls: ['./registartion-admin.component.css']
})
export class RegistartionAdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.org = false;
    this.adm = false;
  }

  ime: string;
  prezime: string;
  kor_ime: string;
  lozinka: string;
  lozinka2: string;
  email: string;
  tel: string;
  error: string;
  adm: boolean;
  org: boolean;
  naz_org: string;
  adr_org: string;
  broj_org: number;

  register_admin(){
    if (this.lozinka == this.lozinka2) {
      this.error = "";
      if (/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,16}$/.test(this.lozinka) && this.lozinka.charAt(0).toLowerCase() != this.lozinka.charAt(0).toUpperCase()) {
        console.log(1)
        this.userService.register_admin(this.ime, this.prezime, this.kor_ime, this.lozinka, this.tel, this.email).subscribe((resp)=>{
          if(resp['msg'] == "OK"){
            alert("Dodat administrator");
          }else if(resp['msg'] == "ki"){
            alert("Nije dodat, jer vec postoji administrator sa datim korisnickim imenom!!!");
          }else if(resp['msg'] == "em"){
            alert("Nije dodat, jer vec postoji administrator sa datim mail-om!!!");
          }else{
            alert("Nije dodat administrator!!!");
          }
        })
      } else {
        this.error = "Lozinka ne zadovoljava uslove da ime bar jedno veliko slovo, jedan broj, jedan specijalan znak, pocinje slovom i duzine od 8 do 16 karaktera!!!";
      }
    } else {
      this.error = "Pogresno ste ponovili lozinku!!!"
    }
  }

  dodaj(){
    if (this.lozinka == this.lozinka2) {
      this.error = "";
      if (/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,16}$/.test(this.lozinka) && this.lozinka.charAt(0).toLowerCase() != this.lozinka.charAt(0).toUpperCase()) {
        console.log(1)
        this.userService.register(this.ime, this.prezime, this.kor_ime, "organizator", this.lozinka, this.tel, this.email, this.naz_org, this.adr_org, this.broj_org, "aktivan").subscribe((resp)=>{
          if(resp['msg'] == "OK"){
            alert("Dodat organizator");
          }else if(resp['msg'] == "ki"){
            alert("Nije dodat, jer vec postoji organizator sa datim korisnickim imenom!!!");
          }else if(resp['msg'] == "em"){
            alert("Nije dodat, jer vec postoji organizator sa datim mail-om!!!");
          }else{
            alert("Nije dodat organizator!!!");
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
