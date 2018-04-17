import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nonEnglish'
})
export class NonEnglishPipe implements PipeTransform {

  transform(str: string) {
    return str ? str.replace(/[^\w ]/g, '') : str;
  }
} 