import { Injectable } from '@nestjs/common';
import { FileUploadRepository } from './fileUpload.repository';

@Injectable()
export class FileUploadService {
  constructor(private readonly fileUploadRepository: FileUploadRepository) {}

  uploadImage(id: string, file: Express.Multer.File) {
    return this.fileUploadRepository.uploadImage(id, file);
  }
}
