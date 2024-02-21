import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validationSchema } from './config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DbConfigService } from './database/db-config.service';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
      isGlobal: true,
      cache: true,
    }),
    SequelizeModule.forRootAsync({
      useClass: DbConfigService,
    }),
    UserModule,
    AuthModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [DbConfigService],
})
export class AppModule {}
