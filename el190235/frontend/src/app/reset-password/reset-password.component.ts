import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute,) {
    activatedRoute.params.subscribe(params => {
      this.par = params['str'];
      console.log(this.par)
    });
    this.error = null;
  }

  ngOnInit(): void {
    localStorage.removeItem('ulogovan')
  }

  email: string;
  par: string;
  lozinka: string;
  lozinka2: string;
  error: string;


  func() {
    this.userService.mail(this.email).subscribe((resp) => {
      alert("Email je poslat na adresu - " + this.email);
    })
  }

  promeni() {

    if (this.lozinka == this.lozinka2) {

      this.userService.getOne(this.par).subscribe((u: User) => {
        let t1 = new Date(u.token_date);
        let t2 = new Date();

        console.log(t1)
        let date_diff_in_seconds = Math.abs((t1.getTime() - t2.getTime()) / 1000);

        console.log(date_diff_in_seconds);

        if (date_diff_in_seconds < 1800) {

          if (/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,16}$/.test(this.lozinka) && this.lozinka.charAt(0).toLowerCase() != this.lozinka.charAt(0).toUpperCase()) {

            this.userService.update(u.ime, u.prezime, u.korisnicko_ime, u.tip, this.lozinka, u.tel, u.email, u.organizacija,
              u.adresa_org, u.broj_org, u.korisnicko_ime, u.slika).subscribe((resp) => {
                if (resp['msg'] == "OK") {
                  alert("Korisniku je promenjena lozinka!!!")
                  this.router.navigate([""]);
                } else {
                  alert("Korisniku nije promenjena lozinka!!!")
                }
              })

          }else{
            this.error = "Lozinka ne zadovoljava uslove da ime bar jedno veliko slovo, jedan broj, jedan specijalan znak, pocinje slovom i duzine od 8 do 16 karaktera!!!";
          }

        } else {
          this.error = "Link za resetovanje lozinke je istekao!!!"
        }

      })

    } else {
      this.error = "Pogresno ste ponovili lozinku!!!"
    }

  }

} 
