import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fichamap'
})
export class FichamapPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return null;
  }

}
