import axios from 'axios';

const BASE_URL = 'http://localhost:3001/products';

export class ProductService {
    static async getProductPrice(productName: string): Promise<number> {
        try {
            const response = await axios.get(`${BASE_URL}/${productName}`);
            return response.data.price;
        } catch (error) {
            throw new Error(`Price not found for product: ${productName}`);
        }
    }
}
