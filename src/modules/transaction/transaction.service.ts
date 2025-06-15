import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        title: createTransactionDto.title,
        price: createTransactionDto.price,
        category: createTransactionDto.category,
        type: createTransactionDto.type,
      },
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    await this.findOne(id); 

    return this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); 

    return this.prisma.transaction.delete({
      where: { id },
    });
  }

  async findByType(type: TransactionType) {
    return this.prisma.transaction.findMany({
      where: { type },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}