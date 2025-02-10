import { ShoppingCart } from '../src/cart';
import { ProductService } from '../src/productService';

jest.mock('../src/productService'); // Mock API calls

describe('ShoppingCart', () => {
    test('should add a product and calculate totals correctly', async () => {
        (ProductService.getProductPrice as jest.Mock).mockResolvedValueOnce(2.52);
        (ProductService.getProductPrice as jest.Mock).mockResolvedValueOnce(9.98);

        const cart = new ShoppingCart();
        await cart.addProduct('cornflakes', 2);
        await cart.addProduct('weetabix', 1);

        const state = cart.getCartState();

        expect(state.items.length).toBe(2);
        expect(state.items[0].name).toBe('cornflakes');
        expect(state.items[0].quantity).toBe(2);
        expect(state.items[1].name).toBe('weetabix');
        expect(state.items[1].quantity).toBe(1);
        expect(state.totals.subtotal).toBe(15.02);
        expect(state.totals.tax).toBe(1.88);
        expect(state.totals.total).toBe(16.9);
    });

    test('should update quantity if the same product is added again', async () => {
        (ProductService.getProductPrice as jest.Mock).mockResolvedValue(2.52);

        const cart = new ShoppingCart();
        await cart.addProduct('cornflakes', 1);
        await cart.addProduct('cornflakes', 1);

        const state = cart.getCartState();
        expect(state.items.find(item => item.name === 'cornflakes')?.quantity).toBe(2);
    });
});
