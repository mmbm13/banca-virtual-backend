import { UseGuards, applyDecorators } from '@nestjs/common';
import { Roles } from '../enums';
import { RolesProtected } from './roles.decorator';
import { RolesGuard } from '../guards';

export const AuthRole = (...args: Roles[]) => {
  return applyDecorators(RolesProtected(...args), UseGuards(RolesGuard));
};
