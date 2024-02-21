import { Status } from '../enums';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTransactionDto {
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
