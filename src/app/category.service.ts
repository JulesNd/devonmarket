import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    // tslint:disable-next-line:indent
  	return this.db.list('/categories', {
      // tslint:disable-next-line:indent
  		query: {
        // tslint:disable-next-line:indent
  			orderByChild: 'name'
        // tslint:disable-next-line:indent
  		}
      // tslint:disable-next-line:indent
  	});
  }
}
