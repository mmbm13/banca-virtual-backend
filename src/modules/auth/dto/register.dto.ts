import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';
import { IdentificationType } from 'src/shared/enums';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(IdentificationType)
  type: IdentificationType;

  @ValidateIf((o) => o.type === IdentificationType.EMAIL)
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ValidateIf((o) => o.type === IdentificationType.TI)
  @IsNotEmpty()
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
