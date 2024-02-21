import { Optional } from 'sequelize';
import {
  Column,
  HasMany,
  Model,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript';
import { IdentificationType, Roles } from '../../../shared/enums';
import { Transaction } from 'src/modules/transaction/schemas';

export type UserAttributes = {
  id: number;
  name: string;
  type: IdentificationType;
  identification?: string;
  email?: string;
  coins?: number;
  password: string;
  avatar?: string;
  role?: Roles;
};

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

@Scopes(() => ({
  withoutPassword: {
    attributes: { exclude: ['password'] },
  },
}))
@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column
  name: string;

  @Unique
  @Column
  email?: string;

  @Column
  type: IdentificationType;

  @Unique
  @Column
  identification?: string;

  @Column
  password: string;

  @Column
  avatar?: string;

  @Column({ defaultValue: Roles.STUDENT })
  role: Roles;

  @Column({ defaultValue: 0 })
  coins: number;

  // Relations
  @HasMany(() => Transaction, { foreignKey: 'toUserId', as: 'received' })
  receivedTransactions: Transaction[];

  @HasMany(() => Transaction, { foreignKey: 'fromUserId', as: 'sended' })
  sendedTransactions: Transaction[];
}
