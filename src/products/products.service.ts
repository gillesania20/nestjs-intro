import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}
    async insertProduct(title: string, desc: string, price: number): Promise <{message: string}> {
        const newProduct = new this.productModel({
            title,
            description: desc,
            price
        });
        await newProduct.save();
        return {message: 'Product inserted'};
    }
    async getProducts(): Promise <{message: string, products: Product []}> {
        const products = await this.productModel.find({}).lean().exec();
        return {
            message: 'Products found',
            products
        };
    }
    async getProduct(productId: string): Promise <{message: string, product: Product | null}> {
        const product = await this.productModel.findOne({_id: productId}).lean().exec();
        return {message: 'product found', product};
    }
    async updateProduct(
        productId: string,
        title: string,
        desc: string,
        price: number
    ): Promise <{message: string}> {
        const update: {
            title: string,
            description: string,
            price: number
        } = {
            title: undefined,
            description: undefined,
            price: undefined
        };
        const findProduct = await this.productModel.findOne({_id: productId}, '_id').lean().exec();
        let response = null;
        if(findProduct === null){
            response = {
                message: 'Product not found'
            };
        }else{
            if(title) {
                update.title = title;
            }
            if(desc) {
                update.description = desc;
            }
            if(price) {
                update.price = price;
            }
            await this.productModel.updateOne({_id: findProduct._id}, update);
            response = {
                message: 'Product updated'
            }
        }
        return response;
    }
    async deleteProduct(prodId: string): Promise <{message: string}> {
        const findProduct = await this.productModel.findOne({_id: prodId}, '_id').lean().exec();
        let response = null;
        if(findProduct === null){
            response = {
                message: 'Product not found'
            }
        }else{
            await this.productModel.deleteOne({_id: findProduct._id});
            response = {
                message: 'Product deleted'
            }
        }
        return response;
    }
}