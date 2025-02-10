import { ShoppingCart } from '../src/cart';
import { ProductService } from '../src/productService';

jest.mock('../src/productService'); // Mock API calls

describe('ShoppingCart', () => {
    let cart: ShoppingCart;

    beforeEach(() => {
        cart = new ShoppingCart();
    });

    test('should add a product and calculate totals correctly', async () => {
        (ProductService.getProductPrice as jest.Mock).mockResolvedValueOnce(2.52);
        (ProductService.getProductPrice as jest.Mock).mockResolvedValueOnce(9.98);

        await cart.addProduct('cornflakes', 2);
        await cart.addProduct('weetabix', 1);

        const state = cart.getCartState();

        expect(state.items.length).toBe(2);
        expect(state.totals.subtotal).toBe(15.02);
        expect(state.totals.tax).toBe(1.88);
        expect(state.totals.total).toBe(16.9);
    });

    test('should update quantity if the same product is added again', async () => {
        (ProductService.getProductPrice as jest.Mock).mockResolvedValue(2.52);

        await cart.addProduct('cornflakes', 1);
        await cart.addProduct('cornflakes', 1);

        const state = cart.getCartState();
        expect(state.items.find(item => item.name === 'cornflakes')?.quantity).toBe(2);
    });

    test('should handle adding zero quantity and ignore it', async () => {
        (ProductService.getProductPrice as jest.Mock).mockResolvedValue(2.52);

        await cart.addProduct('cornflakes', 0);

        const state = cart.getCartState();
        expect(state.items.length).toBe(0); // Cart should remain empty
    });

    test('should throw an error when adding an invalid product', async () => {
        (ProductService.getProductPrice as jest.Mock).mockRejectedValue(new Error('Product not found'));

        await expect(cart.addProduct('unknown', 1)).rejects.toThrow('Product not found');
    });

    test('should handle an empty cart correctly', () => {
        const state = cart.getCartState();

        expect(state.items.length).toBe(0);
        expect(state.totals.subtotal).toBe(0);
        expect(state.totals.tax).toBe(0);
        expect(state.totals.total).toBe(0);
    });
});
