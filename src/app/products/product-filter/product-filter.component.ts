import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category;
  constructor(categoryService: CategoryService) {
    // tslint:disable-next-line:indent
  	this.categories$ = categoryService.getCategories();
  }

}
