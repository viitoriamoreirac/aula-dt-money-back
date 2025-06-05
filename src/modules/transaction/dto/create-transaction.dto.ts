import { TransactionType } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class CreateTransactionDto {
  title: string;
  category: string;
  data: Date;
  price: number;
  @IsEnum(TransactionType)
  type: TransactionType;
}
