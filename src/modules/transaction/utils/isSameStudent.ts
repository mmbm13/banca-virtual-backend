import { UserGeneric } from 'src/shared/interfaces';
import { Transaction } from '../schemas';
import { BadRequestException } from '@nestjs/common';
import { Roles } from 'src/shared/enums';

export function isSameStudent(user: UserGeneric, transaction: Transaction) {
  if (
    transaction.fromUserId !== user.sub &&
    transaction.toUserId !== user.sub &&
    user.role === Roles.STUDENT
  ) {
    throw new BadRequestException('Transaction is not associated with user');
  }
}
