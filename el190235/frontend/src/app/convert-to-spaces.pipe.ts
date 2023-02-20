import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'convertToSpaces' })

export class ConvertToSpacesPipe implements PipeTransform {

    constructor(private domSan: DomSanitizer){}

    transform(value: string) {
        return this.domSan.bypassSecurityTrustResourceUrl(value);
    }

}