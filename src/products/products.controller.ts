import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}
    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): {message: string, products: Product []} {
        return this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
    }
    @Get()
    getAllProducts(): {message: string, products: Product []} {
        return this.productsService.getProducts();
    }
    @Get(':id')
    getSingleProduct(
        @Param('id') prodId: string
    ): {message: string, product: Product} {
        return this.productsService.getProduct(prodId);
    }
    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): {message: string, product: Product} {
        return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    }
    @Delete(':id')
    removeProduct(
        @Param('id') prodId: string
    ): {message: string} {
        return this.productsService.deleteProduct(prodId);
    }
}