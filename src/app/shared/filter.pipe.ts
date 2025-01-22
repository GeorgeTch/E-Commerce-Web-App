import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchInput: string): any[] {
    if (!items) return [];
    if (!searchInput) return items;
    searchInput = searchInput.toLowerCase();
    return items.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchInput) ||
        item.description.toLowerCase().includes(searchInput)
      );
    });
  }
}
