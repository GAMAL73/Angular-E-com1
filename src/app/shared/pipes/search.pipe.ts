import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList: product[], UserWord:string): product[] {
    return productList.filter((item)=>item.title.toLowerCase().includes(UserWord.toLowerCase()));
  }

}
