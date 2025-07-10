export class PaginatedResponseDto<T> {
  transactions: T[];
  totalCount: number;

  constructor(data: T[], total: number, skip: number, take: number) {
    this.transactions = data;
    this.totalCount = total;
  }
} 