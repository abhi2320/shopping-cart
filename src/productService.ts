import axios from 'axios';

const BASE_URL = 'http://localhost:3001/products';

export class ProductService {
    /**
     * Fetches the price of a product from the API.
     * @param productName - The name of the product.
     * @returns {Promise<number>} - The price of the product.
     * @throws {Error} - If the product is not found.
     */
    static async getProductPrice(productName: string): Promise<number> {
        try {
            const response = await axios.get(`${BASE_URL}/${productName}`);
            return response.data.price;
        } catch (error) {
            throw new Error(`Price not found for product: ${productName}`);
        }
    }
}
