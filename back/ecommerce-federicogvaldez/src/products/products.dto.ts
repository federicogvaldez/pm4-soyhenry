import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  stock: number;

  @IsString()
  imgUrl: string;
}
