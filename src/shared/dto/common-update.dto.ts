import { Type } from 'class-transformer';
import { IsDateString, IsOptional, IsPositive } from 'class-validator';

export class CommonUpdateDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @IsDateString()
  @IsOptional()
  createdAt: string;

  @IsDateString()
  @IsOptional()
  updatedAt: string;
}
