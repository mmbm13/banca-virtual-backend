import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto, QueryTransactionDto } from '../dto';
import { TransactionRepository } from '../repositories/transaction.repository';
import { UserGeneric } from 'src/shared/interfaces';
import { buildQuery } from 'src/shared/utils/buildQuery';
import { isSameStudent } from '../utils';
import { Status } from '../enums';
import { Sequelize } from 'sequelize-typescript';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly sequelize: Sequelize,
  ) {}

  create(user: UserGeneric, createTransactionDto: CreateTransactionDto) {
    if (user.sub === createTransactionDto.toUserId) {
      throw new BadRequestException('Is not allowed to transfer yourself');
    }
    return this.transactionRepository.create({
      fromUserId: user.sub,
      ...createTransactionDto,
    });
  }

  findAll(queryDto: QueryTransactionDto) {
    const query = buildQuery(queryDto);
    const countQuery = buildQuery(queryDto, true);
    return Promise.all([
      this.transactionRepository.findAll(query),
      this.transactionRepository.countAll(countQuery),
    ]);
  }

  async findOne(id: number, user: UserGeneric) {
    const transaction = await this.transactionRepository.findOne(id);
    isSameStudent(user, transaction);

    return transaction;
  }

  async claim(id: number, user: UserGeneric) {
    const transaction = await this.findOne(id, user);

    if (transaction.status !== Status.PENDING) {
      throw new BadRequestException('Transaction already claimed');
    }

    if (transaction.toUserId !== user.sub) {
      throw new BadRequestException(
        'You can not claim the coins owned by other student',
      );
    }

    await this.sequelize.transaction(async (t) => {
      await this.transactionRepository.update(
        id,
        { status: Status.COMPLETED },
        t,
      );

      await this.userRepository.addCoins(user.sub, transaction.coins, t);
    });
  }

  async remove(id: number) {
    return await this.transactionRepository.remove(id);
  }
}
