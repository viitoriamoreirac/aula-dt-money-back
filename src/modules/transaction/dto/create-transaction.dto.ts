import { TransactionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(TransactionType)
  type: TransactionType;
}