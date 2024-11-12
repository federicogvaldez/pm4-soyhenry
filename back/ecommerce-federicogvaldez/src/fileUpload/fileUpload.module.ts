import { Module } from '@nestjs/common';
import { FileUploadController } from './fileUpload.controller';
import { FileUploadService } from './fileUpload.service';
import { FileUploadRepository } from './fileUpload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileUploadRepository, CloudinaryConfig],
})
export class FileUploadModule {}
