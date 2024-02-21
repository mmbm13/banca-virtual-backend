import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/shared/dto';
import { Status } from '../enums';
import { Type } from 'class-transformer';

export class QueryTransactionDto extends PaginationDto {
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  toUserId: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  fromUserId: number;
}
