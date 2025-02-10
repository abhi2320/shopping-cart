import { ProductService } from './productService';

interface CartItem {
    name: string;
    quantity: number;
    price: number;
}

export class ShoppingCart {
    private items: CartItem[] = [];

    async addProduct(name: string, quantity: number): Promise<void> {
        const price = await ProductService.getProductPrice(name);
        const existingItem = this.items.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ name, quantity, price });
        }
    }

    calculateTotals() {
        const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = Math.round(subtotal * 0.125 * 100) / 100;
        const total = Math.round((subtotal + tax) * 100) / 100;

        return { subtotal, tax, total };
    }

    getCartState() {
        return {
            items: this.items,
            totals: this.calculateTotals()
        };
    }
}
