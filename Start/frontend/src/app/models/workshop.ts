export class WorkShop{
    _id : string;
    naziv: string;
    organizator: string;
    mesto: string;
    kratak_opis: string;
    duzi_opis: string
    datum: Date;
    mesta: number;
    zauzeto: number;
    slika0: string;
    slike: Array<string>;
    prihvaceni: Array<string>;
    cekaju: Array<string>;
    status: string;
    blizu: boolean;
    tip: string;
    brojLajkova: number;
}
