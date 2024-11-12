import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return (await this.categoriesRepository.find()).map((el) => el.name);
  }

  // async addCategories() {
  //   data.map(async (element) => {
  //     await this.categoriesRepository

  //       .createQueryBuilder()
  //       .insert()
  //       .into(Categories)
  //       .values({ name: element.category })
  //       .orIgnore()
  //       .execute();
  //   });
  //   return 'Categories added';
  // }

  async addCategories() {
    const duplicatesRemove = Array.from(new Set(data.map((el) => el.category)));

    const categories = duplicatesRemove.map((el) => ({ name: el }));

    await this.categoriesRepository.save(categories);
    return 'Categories added';
  }
}
