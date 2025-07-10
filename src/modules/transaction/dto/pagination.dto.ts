import { IsOptional, IsPositive, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Skip must be an integer' })
  @Min(0, { message: 'Skip must be greater than or equal to 0' })
  skip?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Take must be an integer' })
  @IsPositive({ message: 'Take must be a positive number' })
  take?: number = 10;
} 