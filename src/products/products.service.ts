import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    insertProduct(title: string, desc: string, price: number): {message: string, products: Product []} {
        const newProduct = new Product(Math.random().toString(), title, desc, price);
        this.products.push(newProduct);
        return {message: 'Product inserted', products: [...this.products]};
    }
    getProducts(): {message: string, products: Product []} {
        return {
            message: 'Products found',
            products: [...this.products]
        };
    }
    getProduct(productId: string): {message: string, product: Product} {
        const [, index] = this.findProduct(productId);
        return {message: 'product found', product: this.products[index]};
    }
    updateProduct(
        productId: string,
        title: string,
        desc: string,
        price: number
    ): {message: string, product: Product}{
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};
        if(title) {
            updatedProduct.title = title;
        }
        if(desc) {
            updatedProduct.description = desc;
        }
        if(price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
        return {message: 'product updated', product: updatedProduct};
    }
    deleteProduct(prodId: string): {message: string} {
        const [, index] = this.findProduct(prodId);
        this.products.splice(index, 1);
        return {message: 'product deleted'};
    }
    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if(product === null || product === undefined){
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex];
    }
}