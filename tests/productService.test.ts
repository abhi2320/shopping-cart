import { ProductService } from '../src/productService';
import axios from 'axios';

jest.mock('axios');

test('should fetch price for a product', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { price: 2.52 } });
    const price = await ProductService.getProductPrice('cornflakes');
    expect(price).toBe(2.52);
});

test('should throw error for unavailable product', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Not Found'));
    await expect(ProductService.getProductPrice('unknown')).rejects.toThrow('Price not found');
});
