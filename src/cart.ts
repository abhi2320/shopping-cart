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
     * @param name - The name of the product.
     * @param quantity - The quantity to add.
     */
    async addProduct(name: string, quantity: number): Promise<void> {
        if (quantity <= 0) {
            console.warn(`Ignoring invalid quantity: ${quantity} for ${name}`);
            return; // Ignore invalid quantity
        }

        try {
            const price = await ProductService.getProductPrice(name);
            const existingItem = this.items.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({ name, quantity, price });
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to add product: ${error.message}`);
            } else {
                throw new Error(`Failed to add product: Unknown error`);
            }
        }
    }

    /**
     * Calculates the subtotal, tax, and total payable amount.
     */
    private calculateTotals() {
        const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = Math.round(subtotal * 0.125 * 100) / 100;
        const total = Math.round((subtotal + tax) * 100) / 100;

        return { subtotal, tax, total };
    }

    /**
     * Retrieves the current state of the cart.
     */
    getCartState() {
        return {
            items: this.items,
            totals: this.calculateTotals()
        };
    }
}
