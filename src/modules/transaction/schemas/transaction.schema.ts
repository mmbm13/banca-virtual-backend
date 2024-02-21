import { Optional } from 'sequelize';
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Status } from '../enums';
import { User } from 'src/modules/user/schemas';

export type TransactionAttributes = {
  id: number;
  toUserId: number;
  fromUserId: number;
  status?: Status;
  coins: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TransactionCreationAttributes = Optional<
  TransactionAttributes,
  'id'
>;

@Table
export class Transaction extends Model<
  TransactionAttributes,
  TransactionCreationAttributes
> {
  @ForeignKey(() => User)
  @Column
  toUserId: number;

  @ForeignKey(() => User)
  @Column
  fromUserId: number;

  @Column({ defaultValue: Status.PENDING })
  status: Status;

  @Column
  coins: number;

  @CreatedAt
  createdAt: string;

  @UpdatedAt
  updatedAt: string;

  // Relations
  @BelongsTo(() => User, { foreignKey: 'toUserId', as: 'receiver' })
  toUser: User;

  @BelongsTo(() => User, { foreignKey: 'fromUserId', as: 'sender' })
  fromUser: User;
}
