import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ category, data, price, title, type }: CreateTransactionDto) {
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        title,
        category,
        data,
        price,
        type,
      },
    });
    return createdTransaction;
  }

  async findAll(paginationDto?: PaginationDto) {
    const { skip = 0, take = 10 } = paginationDto || {};
    
    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        skip: Number(skip),
        take: Number(take),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.transaction.count(),
    ]);

    return new PaginatedResponseDto(transactions, total, Number(skip), Number(take));
  }

  async findOne(id: string) {
    const foundTransaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    
    if (!foundTransaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    
    return foundTransaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    await this.findOne(id);

    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
    return updatedTransaction;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
