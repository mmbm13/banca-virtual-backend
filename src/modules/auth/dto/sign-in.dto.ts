import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { IdentificationType } from 'src/shared/enums';

export class SignInDto {
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

  @IsNotEmpty()
  @IsString()
  password: string;
}
