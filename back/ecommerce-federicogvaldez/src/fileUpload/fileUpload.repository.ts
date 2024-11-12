import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import toStream = require('buffer-to-stream');

@Injectable()
export class FileUploadRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(id: string, file: Express.Multer.File): Promise<Products> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    try {
      const value: Promise<UploadApiResponse> = new Promise(
        (resolve, reject) => {
          const upload = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => (error ? reject(error) : resolve(result)),
          );
          toStream(file.buffer).pipe(upload);
        },
      );

      await this.productsRepository.update(
        { id },
        { imgUrl: (await value).secure_url },
      );

      return this.productsRepository.findOneBy({ id });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`File upload error: ${error.message}`);
    }
  }
}
