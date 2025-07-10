import { TransactionType } from '@prisma/client';
import {
  IsOptional,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateTransactionDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  category?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Data must be a valid date string' })
  data?: Date;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  price?: number;

  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;
}
