import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Order } from '../enums';

export class PaginationDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  end: number;

  @Min(0)
  @IsOptional()
  @Type(() => Number)
  start: number;

  @IsString()
  @IsOptional()
  @IsEnum(Order)
  order: string;

  @IsString()
  @IsOptional()
  sort: string;

  @IsString()
  @IsOptional()
  q: string;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive({ each: true })
  @Type(() => Number)
  id: number | number[];
}
