import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, Matches } from 'class-validator';
import { CommonUpdateDto } from 'src/shared/dto/common-update.dto';

export class UpdateUserDto extends IntersectionType(
  PartialType(CreateUserDto),
  CommonUpdateDto,
) {
  @IsOptional()
  @Matches(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*()/|<>;~\-_]).{8,}$/, {
    message: 'weak password',
  })
  password: string;
}
