import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  Transaction,
  TransactionAttributes,
  TransactionCreationAttributes,
} from '../schemas';
import { FindOptions, Transaction as TransactionSequelize } from 'sequelize';
import { User } from 'src/modules/user/schemas';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
  ) {}

  async findAll(
    query: FindOptions<TransactionAttributes> = {},
  ): Promise<Transaction[]> {
    return await this.transactionModel.findAll({
      ...query,
      include: [
        { model: User, as: 'sender', attributes: ['name'] },
        { model: User, as: 'receiver', attributes: ['name'] },
      ],
    });
  }

  async countAll(
    query: FindOptions<TransactionAttributes> = {},
  ): Promise<number> {
    return this.transactionModel.count(query);
  }

  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionModel.findOne({
      where: {
        id,
      },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found.');
    }
    return transaction;
  }

  async create(data: TransactionCreationAttributes): Promise<Transaction> {
    return await this.transactionModel.create(data);
  }

  async update(
    id: number,
    data: Partial<TransactionCreationAttributes>,
    transaction?: TransactionSequelize,
  ): Promise<Transaction> {
    const [affectedRows, transactions] = await this.transactionModel.update(
      data,
      {
        where: { id },
        returning: true,
        transaction,
      },
    );

    if (!affectedRows) {
      throw new NotFoundException('Transaction not found.');
    }
    return transactions[0];
  }

  async remove(id: number): Promise<any> {
    const affectedRows = await this.transactionModel.destroy({ where: { id } });
    if (!affectedRows) {
      throw new NotFoundException('Transaction not found.');
    }
    return;
  }

  async findAllBySender(fromUserId: number): Promise<Transaction> {
    return this.transactionModel.findOne({ where: { fromUserId } });
  }

  async findAllByReceiver(toUserId: number): Promise<Transaction> {
    return this.transactionModel.findOne({ where: { toUserId } });
  }
}
