import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  postProduct(data: ProductDto) {
    return this.productsRepository.postProduct(data);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  putProduct(id: string, data: ProductDto) {
    return this.productsRepository.putProduct(id, data);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteUser(id);
  }
}
