import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000/workshops';

  hi(){
    console.log("hi usao")
    return this.http.get(`${this.uri}/hi`);
  }

  insert(naziv, organizator, mesto, ko, duzi_opis, datum, mesta, slika0, gallery, status){
    const data={
      naziv: naziv,
      organizator: organizator,
      mesto: mesto,
      kratak_opis: ko,
      duzi_opis: duzi_opis,
      datum: datum,
      mesta: mesta,
      zauzeto: 0,
      slika0: slika0,
      slike: gallery,
      prihvaceni: new Array(),
      cekaju: new Array(),
      status: status
    }

    return this.http.post(`${this.uri}/insert`, data);
  }

  update(_id, naziv, organizator, mesto, ko, duzi_opis, datum, mesta, zauzeto, slika0, gallery, prihvaceni, cekaju, status){
    const data={
      _id: _id,
      naziv: naziv,
      organizator: organizator,
      mesto: mesto,
      kratak_opis: ko,
      duzi_opis: duzi_opis,
      datum: datum,
      mesta: mesta,
      zauzeto: zauzeto,
      slika0: slika0,
      slike: gallery,
      prihvaceni: prihvaceni,
      cekaju: cekaju,
      status: status
    }

    return this.http.post(`${this.uri}/update`, data);
  }

  getAll(){
    return this.http.get(`${this.uri}/getAll`);
  }

  deleteAllCommentsAndLikes(naziv){
    const data={
      naziv: naziv
    }

    return this.http.post(`${this.uri}/deleteAllCommentsAndLikes`, data);
  }

  getAllForUser(k){
    const data={
      korisnicko_ime: k
    }

    return this.http.post(`${this.uri}/getAllForUser`, data);
  }

  getAllForUser2(k){
    const data={
      korisnicko_ime: k
    }

    return this.http.post(`${this.uri}/getAllForUser2`, data);
  }

  getAllForUser3(k){
    const data={
      korisnicko_ime: k
    }

    return this.http.post(`${this.uri}/getAllForUser3`, data);
  }

  getAllForUser4(){
    return this.http.get(`${this.uri}/getAllForUser4`);
  }

  getLikes(k){
    const data={
      korisnicko_ime: k
    }

    return this.http.post(`${this.uri}/getLikes`, data);
  }

  getComments(k){
    const data={
      korisnicko_ime: k
    }

    return this.http.post(`${this.uri}/getComments`, data);
  }

  deleteLike(ucesnik, radionica){
    const data={
      ucesnik: ucesnik,
      radionica: radionica
    }

    return this.http.post(`${this.uri}/deleteLike`, data);
  }

  deleteComment(ucesnik, radionica){
    const data={
      ucesnik: ucesnik,
      radionica: radionica
    }

    return this.http.post(`${this.uri}/deleteComment`, data);
  }

  updateComment(ucesnik, radionica, komentar){
    const data={
      ucesnik: ucesnik,
      radionica: radionica,
      komentar: komentar
    }

    return this.http.post(`${this.uri}/updateComment`, data);
  }

  povuciPrijavu(naziv, korisnicko_ime){
    const data={
      korisnicko_ime: korisnicko_ime,
      naziv: naziv
    }

    return this.http.post(`${this.uri}/povuciPrijavu`, data);
  }

  addPart(naziv, korisnicko_ime){
    const data={
      korisnicko_ime: korisnicko_ime,
      naziv: naziv
    }

    return this.http.post(`${this.uri}/addPart`, data);
  }

  alreadyPart(naziv, korisnicko_ime){
    const data={
      korisnicko_ime: korisnicko_ime,
      naziv: naziv
    }

    return this.http.post(`${this.uri}/alreadyPart`, data);
  }
  
  hastPastWorkshop(naziv, korisnicko_ime){
    const data={
      korisnicko_ime: korisnicko_ime,
      naziv: naziv
    }

    return this.http.post(`${this.uri}/hastPastWorkshop`, data);
  }

  getLikesForWorkshop(naziv){
    const data={
      naziv: naziv
    }

    return this.http.post(`${this.uri}/getLikesForWorkshop`, data);
  }

  getCommentsForWorkshop(naziv){
    const data={
      naziv: naziv
    }

    return this.http.post(`${this.uri}/getCommentsForWorkshop`, data);
  }

  addLike(naziv, korisnicko_ime){
    const data={
      korisnicko_ime: korisnicko_ime,
      naziv: naziv
    }

    return this.http.post(`${this.uri}/addLike`, data);
  }

  addComment(naziv, korisnicko_ime, komentar){
    const data={
      korisnicko_ime: korisnicko_ime,
      naziv: naziv,
      komentar: komentar
    }

    return this.http.post(`${this.uri}/addComment`, data);
  }

  changeStatus(_id){
    const data={
      _id: _id
    }

    return this.http.post(`${this.uri}/changeStatus`, data);
  }

}
