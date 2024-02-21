import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserAttributes, UserCreationAttributes } from '../schemas';
import { FindOptions, Transaction as TransactionSequelize } from 'sequelize';
import { Transaction } from 'src/modules/transaction/schemas';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(query: FindOptions<UserAttributes> = {}): Promise<User[]> {
    return this.userModel.scope('withoutPassword').findAll(query);
  }

  async countAll(query: FindOptions<UserAttributes> = {}): Promise<number> {
    return this.userModel.count(query);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.scope('withoutPassword').findOne({
      where: {
        id,
      },
      include: [
        { model: Transaction, as: 'sended', limit: 10 },
        { model: Transaction, as: 'received', limit: 10 },
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async create(data: UserCreationAttributes): Promise<User> {
    try {
      return await this.userModel.create(data);
    } catch (error) {
      if (error?.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Email or Identification already exist');
      }
      throw error;
    }
  }

  async update(
    id: number,
    data: Partial<UserCreationAttributes>,
  ): Promise<User> {
    try {
      const [affectedRows, users] = await this.userModel.update(data, {
        where: { id },
        returning: true,
      });
      if (!affectedRows) {
        throw new NotFoundException('User not found.');
      }

      users[0].setDataValue('password', undefined);
      return users[0];
    } catch (error) {
      if (error?.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Email or Identification already exist');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<any> {
    const affectedRows = await this.userModel.destroy({ where: { id } });
    if (!affectedRows) {
      throw new NotFoundException('User not found.');
    }
    return;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async findByIdentification(identification: string): Promise<User> {
    return this.userModel.findOne({ where: { identification } });
  }

  async addCoins(id: number, coins: number, transaction: TransactionSequelize) {
    return this.userModel.increment('coins', {
      by: coins,
      transaction,
      where: { id },
    });
  }
}
