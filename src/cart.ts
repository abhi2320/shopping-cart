import { ProductService } from './productService';

interface CartItem {
    name: string;
    quantity: number;
    price: number;
}

export class ShoppingCart {
    private items: CartItem[] = [];

    /**
     * Adds a product to the cart.
     * If the product already exists, it updates the quantity.
     * @param name - The name of the product.
     * @param quantity - The quantity to add.
     */
    async addProduct(name: string, quantity: number): Promise<void> {
        const price = await ProductService.getProductPrice(name);
        const existingItem = this.items.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ name, quantity, price });
        }
    }

    /**
     * Calculates the subtotal, tax, and total payable amount.
     * @returns { subtotal: number, tax: number, total: number }
     */
    calculateTotals() {
        const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = Math.round(subtotal * 0.125 * 100) / 100; // Tax at 12.5%
        const total = Math.round((subtotal + tax) * 100) / 100;

        return { subtotal, tax, total };
    }

    /**
     * Retrieves the current state of the cart.
     * @returns { items: CartItem[], totals: { subtotal: number, tax: number, total: number } }
     */
    getCartState() {
        return {
            items: this.items,
            totals: this.calculateTotals()
        };
    }
}
