import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsInt, IsNumber, IsOptional,
         IsPositive, IsString, MinLength
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product title',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title!: string;

  @ApiProperty({
    example: 99.99,
    description: 'Product price',
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 'High quality cotton t-shirt with Teslo logo',
    description: 'Product description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 't-shirt-teslo',
    description: 'Product slug for SEO (auto-generated if not provided)',
    required: false,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    example: 100,
    description: 'Product stock quantity',
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: ['S', 'M', 'L', 'XL'],
    description: 'Available product sizes',
  })
  @IsString({ each: true })
  @IsArray()
  sizes!: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product gender category',
    enum: ['men', 'women', 'kid', 'unisex'],
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender!: string;

  @ApiProperty({
    example: ['clothing', 't-shirt', 'teslo'],
    description: 'Product tags for search',
    required: false,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Product image URLs',
    required: false,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}