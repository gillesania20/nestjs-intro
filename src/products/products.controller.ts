import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}
    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): Promise <{message: string}> {
        return await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
    }
    @Get()
    async getAllProducts(): Promise <{message: string, products: Product []}> {
        return await this.productsService.getProducts();
    }
    @Get(':id')
    async getSingleProduct(
        @Param('id') prodId: string
    ): Promise <{message: string, product: Product | null}> {
        return await this.productsService.getProduct(prodId);
    }
    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): Promise <{message: string}> {
        return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    }
    @Delete(':id')
    removeProduct(
        @Param('id') prodId: string
    ): Promise <{message: string}> {
        return this.productsService.deleteProduct(prodId);
    }
}