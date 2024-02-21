import { Roles } from '../enums';

export interface UserGeneric {
  sub: number;
  email: string;
  role: Roles;
  iat: number;
  exp: number;
}
