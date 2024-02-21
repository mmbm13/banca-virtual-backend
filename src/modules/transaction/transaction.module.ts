import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './schemas';
import { TransactionRepository } from './repositories/transaction.repository';
import { UserRepository } from '../user/repositories/user.repository';
import { User } from '../user/schemas';

@Module({
  imports: [
    SequelizeModule.forFeature([Transaction]),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository, UserRepository],
  exports: [TransactionService],
})
export class TransactionModule {}
