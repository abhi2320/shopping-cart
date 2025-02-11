# Shopping Cart - TypeScript

This is a **TypeScript-based shopping cart** that allows users to add products, fetch their prices from an external API, and calculate totals including tax.

---

## Features
- **Add products to the cart**
- **Retrieve product prices dynamically from an API**
- **Calculate subtotal, tax (12.5%), and total**
- **Handles errors gracefully** (e.g., invalid products)
- **Unit tests included**

---

##  Setup & Installation

### Clone the repository:

git clone https://github.com/abhi2320/shopping-cart.git
cd shopping-cart

### Install dependencies:
npm install

### Start the Price API:
npm run serve-products

This will start the API at http://localhost:3001/

### Usage

Add Products to Cart

import { ShoppingCart } from './src/cart';

(async () => {
    const cart = new ShoppingCart();
    await cart.addProduct('cornflakes', 2);
    await cart.addProduct('weetabix', 1);

    console.log(cart.getCartState());
})();


Example Output:

{
    "items": [
        { "name": "cornflakes", "quantity": 2, "price": 2.52 },
        { "name": "weetabix", "quantity": 1, "price": 9.98 }
    ],
    "totals": {
        "subtotal": 15.02,
        "tax": 1.88,
        "total": 16.9
    }
}


### Running Tests

npm test
