import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/shared/dto';
import { Roles } from 'src/shared/enums';

export class QueryUserDto extends PaginationDto {
  @IsOptional()
  @IsEnum(Roles)
  role: Roles;

  @IsOptional()
  @IsString()
  name: Roles;

  @IsOptional()
  @IsString()
  identification: Roles;
}
