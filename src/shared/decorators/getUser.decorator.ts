import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserGeneric } from '../interfaces';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as UserGeneric;

    if (!user) throw new InternalServerErrorException('User not found');
    return !data ? user : user[data];
  },
);
