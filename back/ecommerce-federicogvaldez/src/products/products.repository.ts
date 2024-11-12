import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductDto } from './products.dto';
import * as data from '../../utils/data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { Categories } from 'src/entities/categories.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(): Promise<Products[]> {
    return await this.productsRepository.find();
  }

  async getProductById(id: string): Promise<Products> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID format. Expected a UUID.');
    }
    const product = this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async postProduct(data: ProductDto): Promise<Products> {
    const newProduct = this.productsRepository.create({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      imgUrl: data.imgUrl,
    });

    return await this.productsRepository.save(newProduct);
  }

  async putProduct(id: string, data: ProductDto): Promise<Products> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID format. Expected a UUID.');
    }
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productsRepository.update(id, data);

    return await this.productsRepository.findOneBy({ id });
  }

  async deleteUser(id: string): Promise<Products> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID format. Expected a UUID.');
    }
    const product = this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productsRepository.delete(id);
    return product;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();

    await Promise.all(
      data.map(async (el) => {
        const category = categories.find((cat) => cat.name === el.category);

        const product = new Products();
        product.name = el.name;
        product.description = el.description;
        product.price = el.price;
        product.stock = el.stock;
        product.category = category;

        await this.productsRepository.save(product);
      }),
    );
    return 'Products added';
  }
}
