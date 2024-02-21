import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  toUserId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  coins: number;
}
