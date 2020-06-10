import { ShoppingCart } from './shopping-cart';
export class Order {
  // tslint:disable-next-line:indent
	datePlaced: number;
  // tslint:disable-next-line:indent
	items: any[];

  // tslint:disable-next-line:indent
	constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    // tslint:disable-next-line:indent
		this.datePlaced = new Date().getTime();
    // tslint:disable-next-line:indent
		this.items = shoppingCart.items.map(i => {
      // tslint:disable-next-line:indent
    		return {
          // tslint:disable-next-line:indent
    			product: {
            // tslint:disable-next-line:indent
    				title: i.title,
            // tslint:disable-next-line:indent
    				imageUrl: i.imageUrl,
            // tslint:disable-next-line:indent
    				price: i.price
            // tslint:disable-next-line:indent
    			},
          // tslint:disable-next-line:indent
    			quantity: i.quantity,
          // tslint:disable-next-line:indent
    			totalPrice: i.totalPrice
          // tslint:disable-next-line:indent
    		};

      // tslint:disable-next-line:indent
    	});
    // tslint:disable-next-line:indent

	}

}
