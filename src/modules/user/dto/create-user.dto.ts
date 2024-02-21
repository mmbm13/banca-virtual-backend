import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { IdentificationType } from 'src/shared/enums';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsEnum(IdentificationType)
  type: IdentificationType;

  @IsOptional()
  @IsString()
  identification?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsNotEmpty()
  @Matches(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*()/|<>;~\-_]).{8,}$/, {
    message: 'weak password',
  })
  password: string;
}
