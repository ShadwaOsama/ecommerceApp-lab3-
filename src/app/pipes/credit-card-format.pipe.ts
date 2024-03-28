import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardFormat',
  standalone: true
})
export class CreditCardFormatPipe implements PipeTransform {

  transform(value: string): string {

    const formattedValue = value.match(/.{1,4}/g)?.join(' - ');
    return formattedValue || 'Invalid credit card number';
  }

}
