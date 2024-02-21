import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enums';

export const ROLES_KEY = 'roles';
export const RolesProtected = (...roles: Roles[]) =>
  SetMetadata(ROLES_KEY, roles);
